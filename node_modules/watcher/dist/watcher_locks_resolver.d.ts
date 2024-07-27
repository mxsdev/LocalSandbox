/// <reference types="node" />
declare const WatcherLocksResolver: {
    interval: number;
    intervalId: NodeJS.Timeout | undefined;
    fns: Map<Function, number>;
    init: () => void;
    reset: () => void;
    add: (fn: Function, timeout: number) => void;
    remove: (fn: Function) => void;
    resolve: () => void;
};
export default WatcherLocksResolver;
