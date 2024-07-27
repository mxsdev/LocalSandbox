/* IMPORT */
/* MAIN */
const debounce = (fn, wait = 1, options) => {
    /* VARIABLES */
    wait = Math.max(1, wait);
    const leading = options?.leading ?? false;
    const trailing = options?.trailing ?? true;
    const maxWait = Math.max(options?.maxWait ?? Infinity, wait);
    let args;
    let timeout;
    let timestampCall = 0;
    let timestampInvoke = 0;
    /* HELPERS */
    const getInstantData = () => {
        const timestamp = Date.now();
        const elapsedCall = timestamp - timestampCall;
        const elapsedInvoke = timestamp - timestampInvoke;
        const isInvoke = (elapsedCall >= wait || elapsedInvoke >= maxWait);
        return [timestamp, isInvoke];
    };
    const invoke = (timestamp) => {
        timestampInvoke = timestamp;
        if (!args)
            return; // This should never happen
        const _args = args;
        args = undefined;
        fn.apply(undefined, _args);
    };
    const onCancel = () => {
        resetTimeout(0);
    };
    const onFlush = () => {
        if (!timeout)
            return;
        onCancel();
        invoke(Date.now());
    };
    const onLeading = (timestamp) => {
        timestampInvoke = timestamp;
        if (leading)
            return invoke(timestamp);
    };
    const onTrailing = (timestamp) => {
        if (trailing && args)
            return invoke(timestamp);
        args = undefined;
    };
    const onTimeout = () => {
        timeout = undefined;
        const [timestamp, isInvoking] = getInstantData();
        if (isInvoking)
            return onTrailing(timestamp);
        return updateTimeout(timestamp);
    };
    const updateTimeout = (timestamp) => {
        const elapsedCall = timestamp - timestampCall;
        const elapsedInvoke = timestamp - timestampInvoke;
        const remainingCall = wait - elapsedCall;
        const remainingInvoke = maxWait - elapsedInvoke;
        const ms = Math.min(remainingCall, remainingInvoke);
        return resetTimeout(ms);
    };
    const resetTimeout = (ms) => {
        if (timeout)
            clearTimeout(timeout);
        if (ms <= 0)
            return;
        timeout = setTimeout(onTimeout, ms);
    };
    /* DEBOUNCED */
    const debounced = (...argsLatest) => {
        const [timestamp, isInvoking] = getInstantData();
        const hadTimeout = !!timeout;
        args = argsLatest;
        timestampCall = timestamp;
        if (isInvoking || !timeout)
            resetTimeout(wait);
        if (isInvoking) {
            if (!hadTimeout)
                return onLeading(timestamp);
            return invoke(timestamp);
        }
    };
    /* DEBOUNCED UTILITIES */
    debounced.cancel = onCancel;
    debounced.flush = onFlush;
    /* RETURN */
    return debounced;
};
/* EXPORT */
export default debounce;
