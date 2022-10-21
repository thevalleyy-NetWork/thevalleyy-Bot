/**
 * Gettime
 * @param {Boolean} full
 * @param {Date} date
 * @returns
 */

const getTime = (full = false, date) => {
    function addZero(x, n) {
        while (x.toString().length < n) {
            x = "0" + x;
        }
        return x;
    }

    d = date ? new Date(parseInt(date)) : new Date();
    let y = d.getFullYear();
    let mm = addZero(d.getMonth() + 1, 2);
    let dd = addZero(d.getDate(), 2);
    let h = addZero(d.getHours(), 2);
    let m = addZero(d.getMinutes(), 2);
    let s = addZero(d.getSeconds(), 2);
    let ms = addZero(d.getMilliseconds(), 3);
    if (full) {
        return `${dd}.${mm}.${y} ${h}:${m}:${s}:${ms}`;
    } else {
        return `${dd}.${mm}. ${h}:${m}:${s}`;
    }
};
module.exports = getTime;
