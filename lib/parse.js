// Color parsers

/**
 * Normalizes the values in an array
 * @function
 * @param {Array} channels - An array of string values
 * @returns {Array}
 * @example
 * // returns [1,1,1]
 * parseChannelValues(['100%','255','255'])
 */
function parseChannelValues(channels) {
    for (var i=0; i<channels.length; i++) {
        if (channels[i].indexOf('%') !== -1) {
            channels[i] = channels[i].substr(0, channels[i].length - 1) / 100;
        } else {
            channels[i] = channels[i] / 255;
        }
        if (channels[i] > 1) {
            channels[i] = 1;
        }
    }
    return channels;
}

/**
 * Parses a HEX string into an RGBA object
 * @function
 * @param {string} value
 * @returns {Object}
 * @example
 * // returns { rgba: {r:1, g:1, b:1, a:1} }
 * parseHexString('#fff')
 */
function parseHexString(value) {
    var retval;
    if (/^#([0-9a-f]{3}){1,2}$/i.test(value)) {
        if (value.length === 4) {
            value = value.replace(/[0-9a-f]/gi, replaceCallback);
        }
        retval = { rgba: hexa2rgb(value) };
        retval.rgba.a = 1;
    } else if (/^#([0-9a-f]{4}){1,2}$/i.test(value)) {
        if (value.length === 5) {
            value = value.replace(/[0-9a-f]/gi, replaceCallback);
        }
        retval = { rgba: hexa2rgb(value) };
    }
    return retval;
}

/**
 * Parses a RGBA string into an RGBA object
 * @function
 * @param {string} value
 * @returns {Object}
 * @example
 * // returns { rgba: {r:1, g:1, b:1, a:1} }
 * parseRgbaString('rgba(100%,255,255,1)')
 */
function parseRgbaString(value) {
    var parts, alpha;
    parts = value.match(/^rgba\((\d+%?),(\d+%?),(\d+%?),(\.\d+|\d+\.?\d*)\)$/);
    if (parts && parts.length === 5) {
        parts.shift();
        alpha = parts.pop() / 1; // Divide by 1 to convert string to number
        if (alpha > 1) {
            alpha = 1;
        }
        parts = parseChannelValues(parts);
        return {
            rgba: {
                r: parts[0],
                g: parts[1],
                b: parts[2],
                a: alpha
            }
        };
    }
}

/**
 * Parses a RGB string into an RGBA object
 * @function
 * @param {string} value
 * @returns {Object}
 * @example
 * // returns { rgba: {r:1, g:1, b:1, a:1} }
 * parseRgbString('rgb(100%,255,255)')
 */
function parseRgbString(value) {
    var parts;
    parts = value.match(/^rgb\((\d+%?),(\d+%?),(\d+%?)\)$/);
    if (parts && parts.length === 4) {
        parts.shift();
        parts = parseChannelValues(parts);
        return {
            rgba: {
                r: parts[0],
                g: parts[1],
                b: parts[2],
                a: 1
            }
        };
    }
}

/**
 * Parses a HSLA string into an HSLA object
 * @function
 * @param {string} value
 * @returns {Object}
 * @example
 * // returns { hsla: {h:1, s:1, l:1, a:1} }
 * parseHslaString('hsla(0,100%,100%,1)')
 */
function parseHslaString(value) {
    var parts, alpha, hue;
    parts = value.match(/^hsla\((-?\d+),(\d+%),(\d+%),(\.\d+|\d+\.?\d*)\)$/);
    if (parts && parts.length === 5) {
        parts.shift();
        hue = parts.shift() / 360;
        hue = hue - Math.floor(hue);
        alpha = parts.pop() / 1; // Divide by 1 to convert string to number
        if (alpha > 1) {
            alpha = 1;
        }
        parts = parseChannelValues(parts);
        return {
            hsla: {
                h: hue,
                s: parts[0],
                l: parts[1],
                a: alpha
            }
        };
    }
}

/**
 * Parses a HSL string into an HSLA object
 * @function
 * @param {string} value
 * @returns {Object}
 * @example
 * // returns { hsla: {h:1, s:1, l:1, a:1} }
 * parseHslString('hsl(0,100%,100%)')
 */
function parseHslString(value) {
    var parts, hue;
    parts = value.match(/^hsl\((-?\d+),(\d+%),(\d+%)\)$/);
    if (parts && parts.length === 4) {
        parts.shift();
        hue = parts.shift() / 360;
        hue = hue - Math.floor(hue);
        parts = parseChannelValues(parts);
        return {
            hsla: {
                h: hue,
                s: parts[0],
                l: parts[1],
                a: 1
            }
        };
    }
}

/**
 * Parses a CMYK string into an CMYK object
 * @function
 * @param {string} value
 * @returns {Object}
 * @example
 * // returns { cmyk: {c:1, m:1, y:1, k:0} }
 * parseCmykString('device-cmyk(1,1,1,0)')
 */
function parseCmykString(value) {
    var parts, i;
    parts = value.match(/^device-cmyk\((\.\d+|\d+\.?\d*),(\.\d+|\d+\.?\d*),(\.\d+|\d+\.?\d*),(\.\d+|\d+\.?\d*)\)$/);
    if (parts && parts.length === 5) {
        parts.shift();
        for (i=0; i<parts.length; i++) {
            parts[i] = parts[i] / 1; // Divide by 1 to convert string to number
            if (parts[i] > 1) {
                parts[i] = 1;
            }
        }
        return {
            rgba: cmyk2rgb({
                c: parts[0],
                m: parts[1],
                y: parts[2],
                k: parts[3]
            })
        };
    }
}

/**
 * Parses a supported string
 * @function
 * @param {string} value
 * @returns {Object}
 */
function parseString(value) {
    var retval;
    value = value.replace(/\s+/g, '');
    if (/^#/.test(value)) { // hex
        retval = parseHexString(value);
    } else if (/^rgba/.test(value)) {
        retval = parseRgbaString(value);
    } else if (/^rgb/.test(value)) {
        retval = parseRgbString(value);
    } else if (/^hsla/.test(value)) {
        retval = parseHslaString(value);
    } else if (/^hsl/.test(value)) {
        retval = parseHslString(value);
    } else if (/^device-cmyk/.test(value)) {
        retval = parseCmykString(value);
    }
    return retval;
}

/**
 * Parses a supported object
 * @function
 * @param {Object} value
 * @returns {Object}
 */
function parseObject(value) {
    var alpha, retval;
    value = clone(value, parseFloat);
    if (haveFields(value, 'sl') && ! isNaN(value.h)) {
        value.h = value.h - Math.floor(value.h);
        retval = { hsla: value };
        alpha = 1;
        if (haveFields(value, 'a')) {
            alpha = value.a;
        }
        retval.hsla.a = alpha;
    } else if (haveFields(value, 'rgb')) {
        retval = { rgba: value };
        alpha = 1;
        if (haveFields(value, 'a')) {
            alpha = value.a;
        }
        retval.rgba.a = alpha;
    } else if (haveFields(value, 'cmyk')) {
        retval = { rgba: cmyk2rgb(value) };
    }
    return retval;
}

/**
 * Parses any supported value
 * @function
 * @param {*} value
 * @returns {Object}
 */
function parse(value) {
    var retval;
    if (typeof value === 'string') {
        retval = parseString(value);
    } else if (value instanceof Color) {
        retval = {
            rgba: value.getRgba(),
            hsla: value.getHsla()
        };
    } else if (typeof value === 'object') {
        retval = parseObject(value);
    }
    return retval;
}