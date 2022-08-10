from typing import Type, cast

from snuba.utils.registered_class import RegisteredClass


def test_register() -> None:
    class Foo(metaclass=RegisteredClass):
        @classmethod
        def config_key(cls) -> str:
            return cls.__name__

    class Bar(Foo):
        pass

    assert Foo.from_name("Bar") is Bar
    assert Foo.from_name("Foo") is None


def test_register_different() -> None:
    class X(metaclass=RegisteredClass):
        @classmethod
        def config_key(cls) -> str:
            return cls.__name__

    class Y(X):
        pass

    assert X.from_name("X") is None
    assert X.from_name("Bar") is None
    assert X.from_name("Y") is Y
    assert Y.from_name("Y") is Y


def test_custom_key() -> None:
    class CustomKey(metaclass=RegisteredClass):
        @classmethod
        def config_key(cls) -> str:
            return "custom_af"

    class ExtraCustom(CustomKey):
        @classmethod
        def config_key(cls) -> str:
            return "cool_key"

    assert CustomKey.from_name("cool_key") is ExtraCustom
    assert CustomKey.from_name("custom_af") is None


class TypedFromName(metaclass=RegisteredClass):
    @classmethod
    def config_key(cls) -> str:
        return cls.__name__

    @classmethod
    def from_name(cls, name: str) -> Type["TypedFromName"]:
        return cast(
            Type[TypedFromName], getattr(cls, "_registry").get_class_from_name(name)
        )


class ExtraName(TypedFromName):
    @classmethod
    def config_key(cls) -> str:
        return "ExtraName"


def test_override_from_name() -> None:

    assert isinstance(TypedFromName.from_name("ExtraName")(), ExtraName)
    assert TypedFromName.from_name("TypedFromName") is None
