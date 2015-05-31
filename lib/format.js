// Prepare values for display in strings

/**
 * Rounds a number to 2 decimal places
 * @function
 * @param {Number} num
 * @returns {Number}
 */
function round2decimal(num) {
    return round(num * 100) / 100;
}

/**
 * Converts a normalized RGB object to an array that can be used
 * to create a string representation of the color
 * @function
 * @param {Object} color
 * @returns {Array}
 */
function getRgbaStringValues(color) {
    return [
        round(color.r * 255),
        round(color.g * 255),
        round(color.b * 255),
        round2decimal(color.a)
    ];
}

/**
 * Converts a normalized HSLA object to an array that can be used
 * to create a string representation of the color
 * @function
 * @param {Object} color
 * @returns {Array}
 */
function getHslaStringValues(color) {
    return [
        round(color.h * 360),
        round(color.s * 100) + '%',
        round(color.l * 100) + '%',
        round2decimal(color.a)
    ];
}

/**
 * Converts a normalized CMYK object to an array that can be used
 * to create a string representation of the color
 * @function
 * @param {Object} color
 * @returns {Array}
 */
function getCmykStringValues(color) {
    return [
        round2decimal(color.c),
        round2decimal(color.m),
        round2decimal(color.y),
        round2decimal(color.k)
    ];
}