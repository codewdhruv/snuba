from __future__ import annotations

import importlib
import os
from abc import ABCMeta
from typing import Any, Dict, Sequence, Tuple, Type, cast


class NoConfigKeyError(Exception):
    pass


class InvalidConfigKeyError(Exception):
    pass


class RegisteredClassNameCollisionError(Exception):
    pass


def _record_init_args(cls: RegisteredClass) -> None:
    from copy import deepcopy

    # from dataclasses import asdict
    from inspect import signature

    # this is a dataclass which has already had a post_init added, we don't need to override
    # anything else
    if hasattr(cls, "__post_init__"):
        return

    orig_init = getattr(cls, "__init__")
    orig_signature = signature(orig_init)
    # if not orig_signature.parameters or [p for p in orig_signature.parameters] == [
    #     "self",
    #     "args",
    #     "kwargs",
    # ]:
    #     # hack around the fact that there is no __init__ constructor for a dataclass when
    #     # the class is defined (it's applied afterwards through the dataclass decorator)

    #     def __post_init__(self):
    #         object.__setattr__(self, "init_kwargs", asdict(self))

    #     setattr(cls, "__post_init__", __post_init__)

    # else:

    def __init__(self: Any, *args: Any, **kwargs: Any) -> Any:
        # no need to capture the init_kwargs again if a subclass
        # has already captured them
        if not hasattr(self, "init_kwargs"):
            object.__setattr__(self, "init_kwargs", deepcopy(kwargs))
            if args:
                init_param_names = [p for p in orig_signature.parameters]
                i = 0
                while i < len(args):
                    self.init_kwargs[init_param_names[i + 1]] = args[i]
                    i += 1
        return orig_init(self, *args, **kwargs)

    __init__.__signature__ = orig_signature  # type: ignore
    setattr(cls, "__init__", __init__)


class _ClassRegistry:
    """Keep a mapping of classes to their names"""

    def __init__(self) -> None:
        self.__mapping: Dict[str, RegisteredClass] = {}

    def register_class(self, cls: "RegisteredClass") -> None:
        key = cls.config_key()
        existing_class = self.__mapping.get(key)
        if not existing_class:
            self.__mapping[key] = cls
        else:
            raise RegisteredClassNameCollisionError(
                f"Class with name {key} already exists in the registry, change the config_key property in the class {cls} or {existing_class}"
            )

    def get_class_from_name(self, config_key: str) -> "RegisteredClass":
        res = self.__mapping.get(config_key)
        if res is None:
            raise InvalidConfigKeyError(
                f"A class with config_key={config_key} does not exist in the registry. Was it ever imported? Are you trying to look up the base class (not supported)?"
            )
        return res

    def all_classes(self) -> Sequence["RegisteredClass"]:
        return list(self.__mapping.values())


class RegisteredClass(ABCMeta):
    """Metaclass for making classes that can be looked up by name
    Usage:
        class SomeGenericClass(metaclass=RegisteredClass):
            @classmethod
            def config_key(cls) -> str:
                return cls.__name__

        class Subclass(SomeGenericClass):
            pass


        assert SomeGenericClass.class_from_name("Subclass") is Subclass

    Notes:
        -   The base class cannot be looked up by name, only subclasses
        -   The `class_from_name` function cannot be typed due to the constraints of python metaclases.
            In order to  get around this limitation, the following workaround is used

            class SomeGenericClass(metaclass=RegisteredClass):

                # the `get_from_name` naming is used as convention
                @classmethod
                def get_from_name(cls, name: str) -> "SomeGenericClass":
                    return typing.cast("SomeGenericClass", cls.class_from_name(name))


    """

    def config_key(cls) -> str:
        raise NotImplementedError

    def __new__(cls, name: str, bases: Tuple[Type[Any]], dct: Dict[str, Any]) -> Any:
        res = super().__new__(cls, name, bases, dct)
        if not hasattr(res, "config_key"):
            raise NoConfigKeyError(
                "RegisteredClass(es) must define the `config-key` property"
            )
        if not hasattr(res, "_registry"):
            setattr(res, "_registry", _ClassRegistry())
        else:
            getattr(res, "_registry").register_class(res)

        _record_init_args(res)
        return res

    def class_from_name(self, name: str) -> Type[Any]:
        return cast(
            Type[Any],
            getattr(self, "_registry").get_class_from_name(name),
        )

    def all_classes(self) -> Sequence[Type[Any]]:
        return [
            cast(Type[Any], rclass)
            for rclass in getattr(self, "_registry").all_classes()
        ]


TModule = object


def import_submodules_in_directory(
    directory_path: str, package_root: str
) -> list[TModule]:
    """Given a directory path, import all the modules in that directory.
    This is meant to be used in concert with RegisteredClass(es) as a RegisteredClass
    needs to be imported to be registered.

    directory_path: a path to the directory where all the RegisteredClass(es) are defined
    package_root: the module path minus the final module name

    Recommendations / Cautions
    --------------------------
        Calling this function in your module definition performs IO operations (reading files) on import.
        The only reason you need to call this is is to use a RegisteredClass, the only reason to use a
        RegisteredClass is because you need to look up classes by string name at runtime.
        If you don't need to do that please rethink as to why you need to dynamically import stuff.

        It is recommended to call this at the end of the module once everything else that needs to be
        initialized has been initialized.


    Example:
    --------
        imagine the following directory structure

        snuba/
        ├─ query_processors/
        │  ├─ __init__.py
        │  ├─ some_other_processor.py
        │  ├─ some_processor.py

        __init__.py contains a RegisteredClass:
        (it can be outside the __init__.py, there's no technical reason it has to but convention makes things convenient)

        >>> class QueryProcessor(metaclass=RegisteredClass):
        >>>     pass

        The other files in the `query_processors` directory define subclasses of the QueryProcessor class.

        In the `__init__.py` simply add:

        >>> import_submodules_in_directory(
        >>>     os.path.dirname(os.path.realpath(__file__)),
        >>>     "snuba.query_processors.snuba"
        >>> )

        As the __init__.py finishes importing, all the subclasses will be registered in the subdirectory, thus

        >>> from snuba.query_processors import QueryProcessor
        >>> QueryProcessor.class_from_name("some_other_processor")

        will return the correct class just by virtue of having imported `QueryProcessor`
    """
    imported_modules: list[object] = []
    for fname in os.listdir(directory_path):
        # this is just a small performance optimization. importlib is smart enough
        # to not infinite loop on re-importing __init__.py but we can just avoid
        # that check. Whether this is called in an __init__.py or not, if we're executing
        # this code, we've already imported the __init__.py
        if fname == "__init__.py" or not fname.endswith(".py"):
            continue
        # ------------------------------------------------------------------------
        module_name = fname.replace(".py", "")
        module_str = f"{package_root}.{module_name}"
        imported_modules.append(importlib.import_module(module_str))
    return imported_modules
