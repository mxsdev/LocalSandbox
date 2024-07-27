declare const enum FileType {
    DIR = 1,
    FILE = 2
}
declare const enum FSTargetEvent {
    CHANGE = "change",
    RENAME = "rename"
}
declare const enum FSWatcherEvent {
    CHANGE = "change",
    ERROR = "error"
}
declare const enum TargetEvent {
    ADD = "add",
    ADD_DIR = "addDir",
    CHANGE = "change",
    RENAME = "rename",
    RENAME_DIR = "renameDir",
    UNLINK = "unlink",
    UNLINK_DIR = "unlinkDir"
}
declare const enum WatcherEvent {
    ALL = "all",
    CLOSE = "close",
    ERROR = "error",
    READY = "ready"
}
export { FileType, FSTargetEvent, FSWatcherEvent, TargetEvent, WatcherEvent };
