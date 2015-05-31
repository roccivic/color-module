/**
 * Local function reference
 */
var round = Math.round;

/**
 * One level deep copy
 * @function
 * @param {Object} obj - An object to be cloned
 * @param {Object} callback - An optional callback function to be exectuted on each value
 * @returns {Object}
 */
function clone(obj, callback) {
    var i, cloned = {};
    for (i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (callback) {
                cloned[i] = callback(obj[i]);
            } else {
                cloned[i] = obj[i];
            }
        }
    }
    return cloned;
}

/**
 * Used to expand shorthand hex strings
 * @function
 * @param {string} match - A match from the replace method
 * @returns {string}
 */
function replaceCallback(match) {
    return match + match;
}

/**
 * Used to check the validity of color channels
 * @function
 * @param {Object} value - The object to check
 * @param {string} fields - A string of channels to check. E.g: 'rgb'
 * @returns {bool}
 */
function haveFields(value, fields) {
    var i, temp, arr = fields.split('');
    for (i in arr) {
        if (arr.hasOwnProperty(i)) {
            temp = parseFloat(value[fields[i]]);
            if (isNaN(temp) || temp < 0 || temp > 1) {
                return false;
            }
        }
    }
    return true;
}