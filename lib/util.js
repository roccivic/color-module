var round = Math.round;

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

// Used to expand shorthand hex strings
function replaceCallback(match) {
    return match + match;
}

// Channel validity checker
function haveFields(value, fields) {
    var i, temp, arr = fields.split('');
    for (i in arr) {
        if (arr.hasOwnProperty(i)) {
            temp = parseFloat(value[fields[i]]);
            if (isNaN(temp) || temp < 0 || temp > 1) {
                return 0;
            }
        }
    }
    return 1;
}