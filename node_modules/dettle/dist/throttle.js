/* IMPORT */
import debounce from './debounce.js';
/* MAIN */
const throttle = (fn, wait = 1, options) => {
    return debounce(fn, wait, {
        leading: options?.leading ?? true,
        trailing: options?.trailing ?? true,
        maxWait: wait
    });
};
/* EXPORT */
export default throttle;
