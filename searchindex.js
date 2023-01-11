Search.setIndex({"docnames": ["architecture/datamodel", "architecture/overview", "architecture/queryprocessing", "architecture/slicing", "clickhouse/death_queries", "clickhouse/schema_design", "configuration/dataset", "configuration/entity", "configuration/entity_subscription", "configuration/intro", "configuration/migration_group", "configuration/overview", "configuration/readable_storage", "configuration/writable_storage", "contributing/environment", "getstarted", "index", "intro", "language/snql", "migrations/modes", "query/overview"], "filenames": ["architecture/datamodel.rst", "architecture/overview.rst", "architecture/queryprocessing.rst", "architecture/slicing.rst", "clickhouse/death_queries.rst", "clickhouse/schema_design.rst", "configuration/dataset.md", "configuration/entity.md", "configuration/entity_subscription.md", "configuration/intro.rst", "configuration/migration_group.md", "configuration/overview.rst", "configuration/readable_storage.md", "configuration/writable_storage.md", "contributing/environment.rst", "getstarted.rst", "index.rst", "intro.rst", "language/snql.rst", "migrations/modes.rst", "query/overview.rst"], "titles": ["Snuba Data Model", "Snuba Architecture Overview", "Snuba Query Processing", "Snuba Data Slicing (under development)", "Clickhouse Queries Of Death", "ClickHouse Schema Design Best Practices", "Dataset Schema", "Entity Schema", "Entity Subscription Schema", "Dataset Configuration", "Migration Group Schema", "Dataset Configuration", "Readable Storage Schema", "Writable Storage Schema", "Snuba development environment", "Getting started with Snuba", "Features:", "Features:", "The SnQL query language", "Snuba Migration Modes", "Querying Snuba"], "terms": {"thi": [0, 1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 18, 19, 20], "section": [0, 1, 2, 14, 20], "explain": [0, 1, 2, 14, 20], "how": [0, 3, 14, 18, 20], "i": [0, 1, 2, 3, 4, 5, 7, 10, 13, 14, 15, 16, 17, 18, 19, 20], "organ": [0, 1], "user": [0, 2, 5, 19, 20], "face": 0, "map": [0, 5, 7, 12, 13], "underli": [0, 18], "databas": [0, 1, 3, 16, 17, 18], "clickhous": [0, 1, 2, 7, 12, 13, 14, 15, 16, 17, 18, 19, 20], "case": [0, 1, 2, 3, 5, 18, 20], "The": [0, 1, 2, 3, 4, 5, 7, 12, 13, 14, 15, 16, 17, 19, 20], "divid": [0, 2], "horizont": 0, "logic": [0, 7, 16, 17], "physic": 0, "what": [0, 2, 13, 20], "visibl": [0, 20], "client": [0, 1, 15, 16, 17, 20], "through": [0, 1, 2, 5, 9, 11, 16, 17, 18], "queri": [0, 3, 5, 7, 12, 13, 14, 16, 17], "languag": [0, 1, 2, 16, 17, 20], "element": [0, 20], "mai": [0, 3, 5, 15], "1": [0, 3, 5, 18, 19, 20], "tabl": [0, 1, 2, 5, 7, 12, 13, 15, 19, 20], "instead": [0, 14], "concept": 0, "like": [0, 2, 5, 16, 17, 18, 20], "view": [0, 1, 2, 7], "reason": [0, 2, 12, 13, 14], "behind": 0, "divis": 0, "allow": [0, 1, 2, 8, 16, 17, 20], "expos": [0, 18], "stabl": 0, "interfac": [0, 2], "perform": [0, 1, 2, 5, 14, 16, 17], "complex": [0, 2, 5], "intern": [0, 20], "execut": [0, 1, 2, 13, 20], "differ": [0, 1, 2, 3, 5, 7, 18], "part": [0, 2, 5, 18, 20], "improv": 0, "wai": [0, 1, 2, 15, 19, 20], "transpar": 0, "rest": 0, "outlin": [0, 19], "compos": [0, 2], "two": [0, 1, 2, 5, 12, 13, 18, 19], "thei": [0, 1, 2, 18, 19], "ar": [0, 1, 2, 3, 5, 8, 9, 11, 13, 14, 15, 18, 19, 20], "connect": [0, 19, 20], "each": [0, 2, 3, 5, 15, 18, 20], "other": [0, 2, 5, 18, 20], "main": [0, 1, 2, 19], "describ": [0, 1, 2, 18, 20], "below": [0, 1, 18, 20], "A": [0, 1, 3, 4, 12, 13, 15, 18, 20], "name": [0, 2, 3, 6, 7, 8, 10, 12, 13, 20], "space": 0, "over": [0, 2, 5, 16, 17], "It": [0, 1, 2, 14, 18, 20], "provid": [0, 1, 2, 5, 7, 13, 15, 16, 17, 18, 20], "its": [0, 1, 2, 5, 18, 19], "own": [0, 1], "schema": [0, 2, 3, 16, 20], "independ": [0, 1, 2, 5], "from": [0, 1, 2, 3, 4, 5, 7, 13, 14, 15, 16, 17, 18, 20], "both": [0, 1, 2, 5, 16, 17], "term": [0, 1, 5], "discov": [0, 16, 17, 20], "outcom": [0, 5, 16, 17], "session": [0, 16, 17], "There": [0, 1, 18, 20], "them": [0, 2, 5, 20], "can": [0, 1, 2, 3, 5, 13, 16, 17, 18, 19, 20], "seen": 0, "contain": [0, 1, 2, 5, 14, 18, 19, 20], "compon": [0, 2, 6, 7, 8, 10, 12, 13], "defin": [0, 2, 9, 11, 12, 13, 18, 20], "abstract": [0, 7], "concret": 0, "In": [0, 1, 2, 3, 5, 14, 18, 19, 20], "everi": [0, 3, 5, 18, 20], "target": 0, "one": [0, 1, 2, 3, 5, 18, 19, 20], "onli": [0, 1, 2, 12, 13, 18, 19, 20], "extens": 0, "fundament": 0, "block": [0, 6], "an": [0, 1, 2, 3, 5, 7, 13, 18, 20], "repres": [0, 1, 2, 7, 12, 13, 18, 20], "instanc": [0, 3, 15], "transact": [0, 2, 18], "error": [0, 2, 12, 13, 16, 17, 18, 20], "practic": [0, 16], "correspond": [0, 3, 18, 19], "row": [0, 1, 2, 5, 12, 13, 18, 20], "class": [0, 2, 7, 12, 13, 20], "": [0, 3, 6, 13, 14, 18, 19, 20], "set": [0, 2, 3, 7, 14, 16, 17, 18, 19, 20], "ha": [0, 1, 2, 5, 16, 17, 20], "which": [0, 1, 2, 4, 7, 13, 14, 16, 17, 18, 19, 20], "list": [0, 15, 20], "field": [0, 3, 5, 13, 18, 20], "associ": [0, 3, 6], "all": [0, 2, 14, 16, 17, 18, 19, 20], "sever": [0, 2, 16, 17, 20], "against": [0, 13], "valid": [0, 3, 7, 9, 11, 18, 20], "No": [0, 1], "lower": 0, "level": [0, 5], "suppos": [0, 2], "unequivoc": 0, "cannot": [0, 3, 20], "present": [0, 20], "multipl": [0, 1, 2, 3, 16, 17, 18], "relat": [0, 1, 2, 16, 17, 20], "we": [0, 1, 2, 3, 18, 19, 20], "support": [0, 1, 2, 3, 12, 13, 16, 17, 18, 19], "mimic": 0, "foreign": 0, "kei": [0, 2, 3, 5, 7, 12, 13, 18, 20], "meant": 0, "mani": 0, "point": [0, 1, 3, 16, 17, 19], "time": [0, 1, 2, 5, 7, 15, 16, 17, 18, 20], "inherit": 0, "nomin": 0, "subtyp": 0, "group": [0, 11, 18, 20], "share": [0, 1], "parent": 0, "semant": [0, 1, 2], "must": [0, 1, 3, 13, 14, 18, 19], "union": 0, "whose": [0, 5, 20], "also": [0, 1, 2, 14, 15, 18, 19, 20], "possibl": [0, 1, 2, 18, 20], "just": [0, 20], "largest": 0, "unit": [0, 14], "where": [0, 2, 3, 5, 16, 17, 20], "some": [0, 1, 2, 18], "strong": [0, 1], "guarante": [0, 1, 5, 20], "specif": [0, 1, 2, 5, 7, 16, 17, 18, 19, 20], "expect": [0, 19], "serializ": 0, "pleas": [0, 14], "don": 0, "t": [0, 1, 12, 13, 18], "us": [0, 1, 2, 3, 7, 12, 13, 14, 15, 18, 19, 20], "serious": 0, "you": [0, 1, 3, 4, 5, 14, 15, 18, 19, 20], "think": 0, "need": [0, 1, 2, 3, 5, 13, 19, 20], "probabl": 0, "doe": [0, 1, 2, 14, 20], "extend": 0, "ani": [0, 1, 2, 12, 13, 18, 20], "span": [0, 3], "best": [0, 16, 19], "have": [0, 1, 2, 3, 4, 5, 13, 14, 20], "eventu": [0, 1], "impact": [0, 12, 13], "subscript": [0, 1, 2, 7, 11, 13], "These": [0, 1, 2, 3, 9, 11, 14, 18, 19], "work": [0, 1, 2, 5, 16, 18, 19], "sinc": [0, 1, 5, 16, 17], "otherwis": [0, 15], "would": [0, 2, 18, 20], "requir": [0, 1, 2, 3, 5, 7, 12, 13, 18], "do": [0, 2, 3, 4, 5, 14, 18], "To": [0, 2, 3], "precis": 0, "depend": [0, 1, 2, 14, 18, 19], "even": [0, 5, 18], "smaller": 0, "ingest": [0, 14, 16, 17], "topic": [0, 1, 13], "partit": [0, 1, 7, 12, 13], "project_id": [0, 2, 18, 20], "maximum": [0, 8], "more": [0, 1, 5, 18, 19, 20], "detail": [0, 1, 3, 18, 19, 20], "ok": 0, "guid": [0, 15, 20], "materi": [0, 1, 2], "As": [0, 2, 20], "consequ": 0, "reflect": [0, 2], "db": 0, "abl": [0, 20], "gener": [0, 1, 3, 19, 20], "ddl": [0, 16, 17], "statement": [0, 13], "build": [0, 3, 20], "discuss": [0, 1, 2, 20], "abov": [0, 2, 3, 19, 20], "thu": 0, "back": [0, 1], "least": [0, 1], "readabl": [0, 11], "run": [0, 1, 2, 4, 5, 12, 13, 15, 19, 20], "pre": [0, 2, 16, 17, 20], "aggreg": [0, 2, 8, 16, 17, 18], "per": [0, 3, 15, 20], "optim": [0, 13, 16, 17], "writabl": [0, 11], "fill": [0, 1, 13], "exclus": 0, "real": [0, 1, 5], "world": 0, "studi": 0, "necessarili": 0, "current": [0, 16, 17, 18, 19], "sentri": [0, 3, 19], "product": [0, 1, 2, 4], "nor": 0, "same": [0, 2, 3, 4, 5, 12, 13, 18, 19, 20], "deploy": [0, 16], "consid": 0, "taken": [0, 1], "isol": 0, "look": [0, 2, 5, 18, 19, 20], "actual": [0, 5, 18, 20], "april": 0, "2020": 0, "though": [0, 5, 20], "design": [0, 2, 16], "should": [0, 2, 3, 5, 12, 13, 15, 18, 19, 20], "move": [0, 19], "toward": 0, "individu": [0, 2], "raw": [0, 3, 15], "painfulli": 0, "slow": 0, "so": [0, 1, 2, 5, 18, 19, 20], "One": 0, "comput": 0, "hourli": 0, "much": [0, 16, 17], "effici": 0, "planner": 0, "pick": [0, 2, 20], "canon": [0, 5], "three": [0, 3, 18], "event": [0, 1, 2, 13, 16, 17, 18, 20], "form": [0, 2, 3, 16, 17, 18], "give": [0, 2, 5, 18], "common": [0, 2, 20], "read": [0, 1, 3, 7], "put": [0, 5], "less": [0, 20], "load": [0, 1, 2, 5, 9, 11, 20], "clickhosu": 0, "when": [0, 1, 3, 4, 5, 18, 19, 20], "offer": 0, "merg": [0, 1, 20], "serv": [0, 1, 2, 5, 12, 13], "essenti": [0, 1], "simpl": [0, 18], "includ": [0, 2, 14, 18, 20], "togeth": [0, 16, 17], "groupedmessag": [0, 18, 20], "groupassinge": 0, "left": [0, 18, 20], "similar": [0, 1, 2, 15, 16, 17, 20], "wa": [0, 1, 2, 16, 17, 20], "previou": [0, 2], "seri": [1, 2, 16, 17], "orient": 1, "store": [1, 5, 16, 17], "columnari": 1, "distribut": [1, 12, 13, 15, 16, 17, 18], "well": [1, 2, 5, 16, 17], "suit": [1, 14], "kind": [1, 6, 7, 8, 10, 12, 13], "fulli": [1, 19], "input": 1, "stream": [1, 13, 16, 17], "kafka": [1, 13, 14, 15, 16, 17], "todai": 1, "either": [1, 18, 20], "chosen": 1, "becaus": [1, 18], "good": 1, "balanc": [1, 20], "replic": [1, 20], "natur": 1, "flexibl": [1, 5], "engin": [1, 2], "goal": [1, 2], "dataset": [1, 3, 5, 16, 18, 20], "model": [1, 2, 16, 17, 18, 19], "api": [1, 5, 14, 20], "endpoint": [1, 15, 18], "insert": [1, 13], "except": [1, 2, 18, 20], "debug": [1, 18, 20], "mode": [1, 13, 16, 20], "process": [1, 14, 16, 20], "consum": [1, 13, 14, 16, 17, 20], "written": [1, 2, 15], "write": [1, 2, 3, 5, 7, 13, 20], "onto": [1, 2], "most": [1, 2, 14, 16, 17, 20], "effect": 1, "batch": 1, "especi": 1, "our": [1, 2, 5, 18], "pass": [1, 2], "onc": [1, 5, 19, 20], "By": 1, "properli": [1, 2, 3, 19, 20], "select": [1, 2, 4, 5, 7, 15, 20], "dedupl": 1, "achiev": [1, 20], "exactli": [1, 18], "accept": [1, 14, 20], "simplest": 1, "system": [1, 2, 14, 16, 17, 20], "express": [1, 7, 18], "snql": [1, 16, 17, 20], "sent": [1, 18, 20], "post": [1, 20], "http": [1, 20], "call": [1, 20], "transform": [1, 2, 7, 12, 13], "done": [1, 3, 19], "receiv": [1, 2, 20], "result": [1, 2, 3, 12, 13, 18, 20], "push": 1, "regist": 1, "Then": 1, "relev": [1, 3, 20], "updat": [1, 13], "period": [1, 5], "produc": [1, 2, 18], "coexist": 1, "default": [1, 3, 15, 18, 19, 20], "monoton": 1, "multi": [1, 18, 19], "leader": 1, "hit": [1, 20], "replica": [1, 2, 19], "up": [1, 2, 3, 5, 14, 15, 19], "date": 1, "reach": 1, "state": 1, "forc": [1, 19, 20], "befor": [1, 2, 18], "final": [1, 12, 13, 19, 20], "keyword": [1, 18], "singl": [1, 12, 13, 16, 17, 18, 20], "sequenti": [1, 20], "role": 1, "plai": 1, "show": 1, "If": [1, 5, 14, 18, 19], "deploi": [1, 6], "stand": 1, "alon": 1, "won": 1, "legend": 1, "top": [1, 5, 16, 17], "diagram": 1, "illustr": 1, "entiti": [1, 2, 3, 6, 11, 18, 20], "issu": [1, 2, 15, 16, 17, 20], "featur": [1, 3], "whole": 1, "between": [1, 2, 18, 19], "feed": 1, "messag": [1, 2, 5, 13, 20], "upon": 1, "commit": [1, 3, 13], "record": [1, 3, 20], "log": [1, 3, 13], "alert": 1, "synchron": 1, "proce": 1, "lockstep": 1, "ident": 1, "exist": [1, 2, 3], "addit": [1, 2, 20], "step": [1, 2, 14, 20], "replac": [1, 2, 3, 12, 13, 16, 17, 20], "mutat": 1, "unmerg": 1, "reprocess": 1, "etc": [1, 18], "forward": [1, 19], "project": [1, 18, 20], "id": [1, 3, 18, 20], "order": [1, 2, 3, 5, 14, 19, 20], "veri": [1, 2, 20], "simpler": 1, "power": [1, 16, 17], "releas": [1, 16, 17], "health": 1, "while": [1, 2], "mainli": [1, 2], "stat": [1, 16, 17, 20], "page": [1, 16, 17], "still": [1, 5, 20], "under": [1, 16], "construct": 1, "cdc": 1, "start": [2, 13, 14, 16, 19, 20], "pars": 2, "ast": 2, "ands": 2, "sql": [2, 16, 17, 18, 20], "being": [2, 20], "appli": [2, 7, 10, 12, 13, 16, 17, 18, 20], "prevent": [2, 20], "danger": 2, "infrastructur": 2, "data": [2, 14, 15, 16, 17, 18, 19], "focus": [2, 20], "ensur": [2, 3, 12, 13, 14, 19], "match": [2, 20], "custom": [2, 3], "function": [2, 7, 14, 16, 17, 18, 20], "promot": [2, 5], "tag": [2, 5], "introduct": [2, 20], "pointer": 2, "code": [2, 18, 20], "exampl": [2, 3, 18, 19, 20], "json": [2, 18], "base": [2, 3, 16, 17, 18, 20], "new": [2, 3, 5, 19], "With": [2, 5, 18], "chang": [2, 3, 5, 15, 16, 17, 19], "whether": 2, "structur": [2, 3, 18, 20], "here": [2, 3, 12, 13, 16, 17, 18, 19], "modul": [2, 20], "yet": [2, 19], "catch": 2, "invalid": [2, 20], "respons": [2, 7, 12, 13, 18], "return": [2, 18, 20], "http400": 2, "proper": 2, "sub": 2, "check": [2, 12, 13], "right": [2, 18, 19, 20], "after": [2, 5, 18, 20], "happen": [2, 3, 18], "alia": [2, 18], "shadow": 2, "signatur": 2, "column": [2, 3, 7, 12, 13, 18, 20], "reject": 2, "condit": [2, 4, 12, 13, 18, 20], "rang": [2, 3, 18, 20], "stateless": 2, "object": [2, 7, 12, 13, 20], "place": [2, 5, 19], "implement": 2, "sequenc": 2, "apdex": 2, "bucket": [2, 18], "respond": [2, 20], "faster": 2, "At": 2, "end": 2, "entir": [2, 5, 18], "inspect": 2, "appropri": 2, "consist": [2, 5, 18, 20], "rout": [2, 3], "node": [2, 3, 12, 13, 16, 17, 18, 20], "reduc": 2, "notabl": 2, "abc": 2, "access": [2, 5, 15, 16, 17, 20], "valu": [2, 3, 5, 7, 12, 13, 18, 19, 20], "indexof": 2, "been": [2, 4, 20], "rule": [2, 7, 16, 17], "contrarili": [2, 20], "full": [2, 5], "context": [2, 5, 15], "u": [2, 20], "easili": 2, "reus": 2, "across": [2, 3, 18], "compar": [2, 18], "Their": 2, "oper": [2, 5, 18], "For": [2, 3, 18, 20], "find": [2, 18], "equal": [2, 3, 20], "equival": [2, 18], "hashmap": 2, "bloom": 2, "filter": [2, 5, 12, 13, 18, 20], "index": [2, 5], "make": [2, 3, 14, 19, 20], "split": [2, 12, 13], "assembl": 2, "hare": 2, "file": [2, 3, 9, 11, 19], "sort": 2, "ones": [2, 18], "variabl": [2, 14, 19], "increas": [2, 20], "size": 2, "progress": 2, "stop": [2, 3, 5], "soon": 2, "enough": 2, "fetch": 2, "minim": [2, 20], "number": [2, 3, 5, 8, 18, 20], "fewer": 2, "second": [2, 5, 18, 20], "miss": [2, 20], "first": [2, 3, 5, 20], "simpli": [2, 3], "format": [2, 12, 13], "string": [2, 6, 7, 8, 10, 12, 13, 18, 20], "follow": [2, 3, 4, 14, 15, 19, 20], "slightli": 2, "path": 2, "take": [2, 4, 18, 19, 20], "account": 2, "multipli": 2, "solv": 2, "prefer": [2, 5], "type": [2, 3, 7, 12, 13, 18, 20], "few": 2, "respect": [2, 18], "creat": [2, 5], "incredibli": 2, "ineffici": 2, "basic": 2, "overal": [2, 5], "turn": [2, 19], "semi": 2, "activ": [3, 14], "subject": 3, "higher": [3, 16, 17], "volum": [3, 16, 17, 19], "out": [3, 12, 13, 19], "resourc": 3, "redi": [3, 14, 15, 16, 17], "postgr": [3, 16, 17], "assign": [3, 18, 19], "organization_id": 3, "maintain": [3, 20], "logical_partition_map": 3, "futur": 3, "revis": 3, "along": 3, "sliced_storage_set": 3, "incom": [3, 13], "storagesetkei": 3, "slice_id": 3, "pair": [3, 5], "add": [3, 15, 18], "repartit": 3, "increment": 3, "count": [3, 15, 18], "0": [3, 18, 20], "storage_set": 3, "given": [3, 18], "mega": 3, "partial": 3, "resid": 3, "could": 3, "scenario": 3, "now": [3, 19], "usual": 3, "2": [3, 14, 18, 20], "3": [3, 20], "definit": [3, 5], "sliced_clust": 3, "desir": 3, "regular": 3, "storage_set_slic": 3, "calcul": 3, "ultim": 3, "destin": [3, 20], "partition_key_column_nam": [3, 7], "properti": [3, 20], "non": [3, 5], "yaml": [3, 9, 11], "see": [3, 18, 20], "might": 3, "generic_metrics_set": 3, "generic_metrics_distribut": 3, "sliced_kafka_topic_map": 3, "tupl": [3, 18, 20], "logical_topic_nam": 3, "sure": [3, 14, 19], "broker": 3, "sliced_kafka_broker_config": 3, "config": [3, 7, 12, 13, 19], "info": 3, "metric": 3, "broker_config": 3, "note": [3, 15, 18, 19], "boundari": 3, "your": [3, 5, 14, 19], "extra": [3, 13], "flag": [3, 10, 12, 13], "shown": 4, "segfault": 4, "20": [4, 18], "7": 4, "minimum": 4, "version": [4, 6, 7, 8, 10, 12, 13, 14, 18, 20], "snuba": [4, 6, 9, 11, 16, 17, 18], "trace": 4, "tool": 4, "unless": 4, "realli": 4, "want": [4, 14, 18, 19], "down": [4, 20], "environ": [4, 15, 16, 17, 19], "prewher": [4, 20], "fix": 4, "21": 4, "8": 4, "upgrad": [4, 14], "complet": [4, 5, 14, 20], "columnar": 5, "datastor": 5, "demand": 5, "referenc": 5, "ed": 5, "those": [5, 16, 17], "claus": [5, 8, 18], "abil": 5, "advantag": 5, "tradit": 5, "rdbm": 5, "postgresql": 5, "commonli": 5, "nest": [5, 7, 12, 13], "arrai": [5, 6, 7, 8, 10, 12, 13, 18], "attribut": [5, 20], "small": 5, "arbitrari": 5, "often": 5, "howev": 5, "interest": [5, 20], "coupl": 5, "dimens": 5, "locat": [5, 12, 13], "That": 5, "o": 5, "n": [5, 18], "lookup": 5, "known": 5, "direct": [5, 18], "m": [5, 14], "becom": [5, 20], "memori": 5, "ad": [5, 18, 19], "straightforward": 5, "v": [5, 15], "iter": 5, "dure": [5, 20], "migrat": [5, 11, 16, 17], "necessari": [5, 19], "old": 5, "goe": 5, "ttl": 5, "storag": [5, 11, 15, 19], "processor": [5, 7, 12, 13], "duplic": 5, "is_experiment": 6, "boolean": [6, 10, 18, 19], "mark": 6, "experiment": [6, 19], "healthcheck": 6, "fail": 6, "affect": 6, "server": [6, 14, 15, 19], "slo": 6, "conta": [7, 12, 13], "arg": [7, 12, 13], "readable_storag": 7, "readablestorag": 7, "writable_storag": 7, "null": [7, 8, 13, 18, 20], "writablestorag": 7, "storage_selector": 7, "selector": 7, "querystorageselector": 7, "instanti": [7, 12, 13], "query_processor": [7, 12, 13], "logicalqueryprocessor": 7, "queryprocessor": [7, 12, 13], "translation_mapp": 7, "translat": 7, "mapper": 7, "curried_funct": 7, "required_time_column": 7, "slice": [7, 16], "subscription_processor": 7, "subscription_valid": 7, "max_allowed_aggreg": 8, "integ": [8, 18], "disallowed_aggreg": 8, "applic": [9, 11], "option": [10, 18], "determin": [10, 18, 20], "uniqu": [12, 13, 18, 20], "identifi": [12, 13, 18, 20], "set_kei": [12, 13], "collect": [12, 13], "cluster": [12, 13, 15, 19], "local_table_nam": [12, 13], "local": [12, 13, 14, 15, 20], "dist_table_nam": [12, 13], "not_deleted_mandatory_condit": [12, 13], "delet": [12, 13, 20], "eg": [12, 13, 18], "explicitli": [12, 13], "partition_format": [12, 13], "cleanup": [12, 13], "job": [12, 13], "clickhousequeryprocessor": [12, 13], "query_splitt": [12, 13], "splitter": [12, 13], "querysplitstrategi": [12, 13], "runtim": [12, 13], "combin": [12, 13, 16, 17, 18], "mandatory_condition_check": [12, 13], "conditioncheck": [12, 13], "haven": [12, 13], "remov": [12, 13, 20], "secur": [12, 13], "stream_load": 13, "loader": 13, "argument": 13, "convert": 13, "bodi": [13, 18], "default_top": 13, "commit_log_top": 13, "subscription_scheduled_top": 13, "schedul": [13, 20], "subscription_scheduler_mod": 13, "e": [13, 18, 20], "g": [13, 18], "global": 13, "specifi": [13, 18, 20], "subscription_result_top": 13, "replacement_top": 13, "pre_filt": 13, "streammessagefilt": 13, "dlq_polici": 13, "dlq": 13, "polici": 13, "replacer_processor": 13, "replacerprocessor": 13, "writer_opt": 13, "sourc": 14, "refer": [14, 18, 20], "get": [14, 16], "pyenv": 14, "assum": [14, 15], "dev": 14, "homebrew": 14, "m1": 14, "mac": 14, "packag": 14, "ve": 14, "avail": 14, "export": 14, "cpath": 14, "opt": 14, "library_path": 14, "lib": 14, "clone": 14, "repo": 14, "workspac": 14, "git": 14, "github": 14, "com": 14, "getsentri": 14, "command": [14, 20], "python": [14, 20], "virtual": 14, "cd": 14, "setup": 14, "venv": 14, "bin": 14, "pip": 14, "22": 14, "capabl": 14, "devserv": 14, "integr": 14, "alreadi": [14, 19, 20], "docker": [14, 15, 19], "p": 14, "grep": 14, "checkout": 14, "branch": 14, "anoth": [14, 18], "termin": 14, "master": 14, "pull": 14, "devservic": [14, 15, 19], "exclud": [14, 15], "recent": 14, "bring": 14, "due": 14, "quickli": 15, "develop": [15, 16, 17, 19], "clickhouse_host": 15, "localhost": [15, 20], "redis_host": 15, "On": 15, "port": 15, "6379": 15, "9092": 15, "quick": 15, "servic": [15, 16, 17], "line": [15, 20], "conf": [15, 19], "py": [15, 19], "sentry_eventstream": 15, "eventstream": 15, "kafkaeventstream": 15, "And": 15, "everyth": [15, 18], "utc": 15, "experi": 15, "timezon": 15, "mismatch": 15, "sentry_search": 15, "search": [15, 16, 17], "eventsdatasetsnubasearchbackend": 15, "sentry_tsdb": 15, "tsdb": 15, "redissnuba": 15, "redissnubatsdb": 15, "snubaeventstream": 15, "psql": 15, "exec": 15, "sentry_clickhous": 15, "sentry_loc": 15, "found": [15, 18, 19, 20], "hostnam": 15, "host": 15, "rich": [16, 17], "fast": [16, 17], "origin": [16, 17], "evolv": [16, 17], "layer": [16, 17], "graph": [16, 17, 18], "separ": [16, 17, 18, 20], "instal": [16, 17], "directli": [16, 17], "monitor": [16, 17], "architectur": 16, "overview": 16, "within": 16, "configur": [16, 19], "Of": 16, "death": 16, "document": [18, 19, 20], "send": 18, "join": [18, 20], "subqueri": 18, "AND": [18, 20], "OR": 18, "asc": 18, "desc": 18, "encod": 18, "bool": 18, "turbo": [18, 20], "impli": 18, "url": [18, 20], "pattern": 18, "subgraph": 18, "insid": 18, "curli": 18, "brace": 18, "entireti": 18, "anyth": 18, "outer": 18, "alias": 18, "avg": 18, "durat": [18, 20], "AS": [18, 20], "avg_d": 18, "max": 18, "relationship": [18, 20], "short": 18, "hand": 18, "than": 18, "comma": 18, "groupassigne": [18, 20], "tot": 18, "user_id": 18, "somebodi": 18, "inner": 18, "hard": 18, "safe": 18, "convent": 18, "10": [18, 20], "11": 18, "output": 18, "treat": 18, "without": [18, 19], "noth": 18, "empti": 18, "arithmet": 18, "qualifi": 18, "infix": 18, "lh": 18, "op": [18, 20], "rh": 18, "liter": 18, "IN": [18, 20], "NOT": 18, "mandatori": 18, "declar": [18, 20], "pretti": 18, "self": 18, "explanatori": 18, "doesn": 18, "1000": [18, 20], "magic": 18, "floor": 18, "minut": 18, "hour": 18, "dai": 18, "timeseriesprocessor": 18, "timestamp": [18, 20], "event_id": [18, 20], "event_count": 18, "todatetim": [18, 20], "2022": 18, "01": 18, "15t00": 18, "00": [18, 20], "000000": 18, "21t00": 18, "3600": [18, 20], "true": [18, 19], "rate": [18, 20], "isn": 18, "float": 18, "percentag": 18, "Or": 18, "greater": 18, "try": 19, "purpos": 19, "moment": 19, "test": 19, "via": 19, "switch": 19, "live": 19, "control": 19, "envrion": 19, "sentry_distributed_clickhouse_t": 19, "whenev": 19, "off": 19, "alter": 19, "mention": 19, "inform": 19, "fals": [19, 20], "zookeep": 19, "shard": 19, "link": 19, "immedi": [19, 20], "snuba_set": 19, "drive": 20, "author": 20, "architect": 20, "know": 20, "about": 20, "someth": 20, "understand": 20, "offset": 20, "uint64": 20, "record_delet": 20, "uint8": 20, "statu": 20, "nullabl": 20, "last_seen": 20, "datetim": 20, "first_seen": 20, "active_at": 20, "first_release_id": 20, "group_id": 20, "go": 20, "sdk": 20, "titl": 20, "uniq": 20, "uniq_ev": 20, "groupbi": 20, "gt": 20, "2021": 20, "limit": 20, "granular": 20, "readi": 20, "import": 20, "recommend": 20, "care": 20, "cach": 20, "retri": 20, "bulk": 20, "method": 20, "dictionari": 20, "metadata": 20, "bad": 20, "meta": 20, "infer": 20, "1218": 20, "sorri": 20, "payload": 20, "screenshot": 20, "exhaust": 20, "statist": 20, "thread": 20, "alwai": 20, "in_ord": 20, "sampl": 20, "turbo_sample_r": 20, "correct": 20, "4": 20, "200": 20, "success": 20, "400": 20, "500": 20, "mean": 20, "timeout": 20, "advanc": 20, "429": 20, "1621038379": 20, "duration_m": 20, "95": 20, "marks_m": 20, "cache_get": 20, "cache_set": 20, "39": 20, "get_config": 20, "prepare_queri": 20, "rate_limit": 20, "validate_schema": 20, "34": 20, "clickhouse_t": 20, "errors_loc": 20, "referr": 20, "project_r": 20, "project_concurr": 20, "global_r": 20, "global_concurr": 20, "result_row": 20, "result_col": 20, "query_id": 20, "f09f3f9e1c632f395792c6a4bfe7c4f": 20, "_snuba_titl": 20, "_snuba_project_id": 20, "greaterorequ": 20, "_snuba_timestamp": 20, "05": 20, "01t00": 20, "univers": 20, "11t00": 20, "broken": 20, "phase": 20, "tell": 20, "decid": 20, "tree": 20, "awai": 20, "concurr": 20, "involv": 20, "invalid_queri": 20, "sai": 20, "around": 20, "42": 20, "time_window": 20, "150": 20, "resolut": 20, "60": 20, "alongsid": 20, "vari": 20, "paramet": 20, "past": 20, "window": 20, "fall": 20, "larger": 20, "task": 20, "executor": 20, "jitter": 20, "jitteredtaskbuild": 20, "defint": 20}, "objects": {}, "objtypes": {}, "objnames": {}, "titleterms": {"snuba": [0, 1, 2, 3, 14, 15, 19, 20], "data": [0, 1, 3, 5, 20], "model": [0, 20], "dataset": [0, 6, 9, 11], "entiti": [0, 7, 8], "type": 0, "relationship": 0, "between": 0, "consist": [0, 1], "storag": [0, 1, 2, 3, 12, 13], "exampl": 0, "singl": 0, "multi": 0, "join": [0, 2], "architectur": 1, "overview": 1, "ingest": 1, "queri": [1, 2, 4, 18, 20], "within": 1, "sentri": [1, 14, 15, 16, 17, 20], "deploy": 1, "error": 1, "transact": 1, "flow": 1, "session": 1, "outcom": 1, "chang": 1, "captur": 1, "pipelin": [1, 2], "process": 2, "phase": 2, "legaci": 2, "snql": [2, 18], "parser": 2, "valid": 2, "logic": [2, 3], "processor": 2, "selector": 2, "translat": 2, "physic": [2, 3], "splitter": 2, "formatt": 2, "composit": 2, "subqueri": 2, "gener": 2, "express": 2, "push": 2, "down": 2, "simpl": 2, "optim": 2, "slice": 3, "under": 3, "develop": [3, 14], "configur": [3, 9, 11], "map": 3, "partit": 3, "defin": 3, "clickhous": [3, 4, 5], "cluster": 3, "environ": [3, 14], "prepar": [3, 20], "shard": 3, "ad": 3, "kafka": 3, "topic": 3, "work": 3, "start": [3, 15], "consum": 3, "todo": 3, "handl": 3, "subscript": [3, 8, 20], "schedul": 3, "executor": 3, "etc": 3, "Of": 4, "death": 4, "countif": 4, "doom": 4, "schema": [5, 6, 7, 8, 10, 11, 12, 13], "design": 5, "best": 5, "practic": 5, "column": 5, "base": 5, "dictionari": 5, "properti": [6, 7, 8, 10, 12, 13], "migrat": [10, 19], "group": 10, "readabl": 12, "writabl": 13, "prerequisit": 14, "instal": 14, "run": 14, "test": [14, 20], "against": 14, "get": 15, "requir": 15, "set": 15, "featur": [16, 17], "some": [16, 17], "us": [16, 17], "case": [16, 17], "content": 16, "The": 18, "languag": 18, "match": 18, "select": 18, "BY": 18, "where": 18, "have": 18, "order": 18, "limit": 18, "offset": 18, "granular": 18, "total": 18, "sampl": 18, "mode": 19, "enabl": 19, "local": 19, "distribut": 19, "explor": 20, "send": 20, "through": 20, "web": 20, "ui": 20, "via": 20, "curl": 20, "request": 20, "respons": 20, "format": 20, "creat": 20}, "envversion": {"sphinx.domains.c": 2, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 6, "sphinx.domains.index": 1, "sphinx.domains.javascript": 2, "sphinx.domains.math": 2, "sphinx.domains.python": 3, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx.ext.intersphinx": 1, "sphinx": 56}})