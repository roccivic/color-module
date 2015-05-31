var Color = (function(Math){
'use strict';

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
 * @example
 * // returns {r:1, g:2, b:3}
 * clone({r:'1.1', g:'2.2', b:3 }, parseInt);
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
 * @example
 * // returns "aa"
 * replaceCallback("a")
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
 * @example
 * // returns true
 * haveFields({r:1, g:2, b:3}, 'rgb')
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
// Color converters

/**
 * Converts an RGB color object to a HEXA string
 * @function
 * @param {Object} input
 * @returns {string}
 * @example
 * // returns '#ffffffff'
 * rgb2hexa({r:1, g:1, b:1, a:1})
 */
function rgb2hexa(input) {
    var value, byte, retval = '', i=0;
    for (;i<4;i++) {
        byte = round(input[['r','g','b','a'][i]] * 255);
        value = byte.toString(16);
        if (byte < 16) {
            value = "0" + value;
        }
        retval += value;
    }
    return '#' + retval;
}

/**
 * Converts a HEXA string to an RGB color object
 * @function
 * @param {string} value
 * @returns {Object}
 * @example
 * // returns {r:1, g:1, b:1, a:1}
 * hexa2rgb('#ffffffff')
 */
function hexa2rgb(value) {
    var i=0, retval = {};
    for (;i<4;i++) {
        retval[i] = parseInt('0x' + value.substring(i*2+1,i*2+3), 16) / 255;
    }
    return {
        r: retval[0],
        g: retval[1],
        b: retval[2],
        a: retval[3]
    };
}

/**
 * Converts an RGB color object to an HSL color object
 * @function
 * @param {Object} value
 * @returns {Object}
 * @example
 * // returns {h:0, s:0, l:0, a:1}
 * rgb2hsl({r:0, g:0, b:0, a:1})
 */
function rgb2hsl(value) {
    var r = value.r,
    g = value.g,
    b = value.b,
    max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    h,
    s,
    l = (max + min) / 2;
    if (max === min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return {
        h: h,
        s: s,
        l: l,
        a: value.a
    };
}

/**
 * Converts an HSL color object to an RGB color object
 * @function
 * @param {Object} value
 * @returns {Object}
 * @example
 * // returns {r:0, g:0, b:0, a:1}
 * rgb2hsl({h:0, s:0, l:0, a:1})
 */
function hsl2rgb(value) {
    var r, g, b;
    if (value.s === 0) {
        r = g = b = value.l; // achromatic
    } else {
        var hue2rgb = function (p, q, t) {
            if (t < 0) {
                t += 1;
            } else if (t > 1) {
                t -= 1;
            }
            if (t < 1/6) {
                return p + (q - p) * 6 * t;
            }
            if (t < 1/2) {
                return q;
            }
            if (t < 2/3) {
                return p + (q - p) * (2/3 - t) * 6;
            }
            return p;
        };

        var q;
        if (value.l < 0.5) {
            q = value.l * (1 + value.s);
        } else {
            q = value.l + value.s - value.l * value.s;
        }
        var p = 2 * value.l - q;
        r = hue2rgb(p, q, value.h + 1/3);
        g = hue2rgb(p, q, value.h);
        b = hue2rgb(p, q, value.h - 1/3);
    }
    return {
        r: r,
        g: g,
        b: b,
        a: value.a
    };
}

/**
 * Converts an RGB color object to a CMYK color object
 * @function
 * @param {Object} value
 * @returns {Object}
 * @example
 * // returns {c:0, m:0, y:0, k:1}
 * rgb2hsl({r:0, g:0, b:0, a:1})
 */
function rgb2cmyk(value) {
    // achromatic
    if (value.r === value.g && value.g === value.b) {
        return {
            c:0,
            m:0,
            y:0,
            k:1 - value.r
        };
    }
    var k = Math.min(
        1 - value.r,
        1 - value.g,
        1 - value.b
    );
    return {
        c:(1 - value.r - k) / (1 - k),
        m:(1 - value.g - k) / (1 - k),
        y:(1 - value.b - k) / (1 - k),
        k:k
    };
}

/**
 * Converts an CMYK color object to a RGB color object
 * @function
 * @param {Object} value
 * @returns {Object}
 * @example
 * // returns {r:0, g:0, b:0, a:1}
 * rgb2hsl({c:0, m:0, y:0, k:1})
 */
function cmyk2rgb(value) {
    return {
        r: 1 - Math.min(1, value.c * (1 - value.k) + value.k),
        g: 1 - Math.min(1, value.m * (1 - value.k) + value.k),
        b: 1 - Math.min(1, value.y * (1 - value.k) + value.k),
        a: 1
    };
}
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
// Prepare values for display in strings

/**
 * Rounds a number to 2 decimal places
 * @function
 * @param {Number} num
 * @returns {Number}
 * @example
 * // returns 1.11
 * round2decimal(1.11111)
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
 * @example
 * // returns [255,255,255,1.11]
 * getRgbaStringValues({r:1, g:1, b:1, a:1.111})
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
 * @example
 * // returns [360,'100%','100%',1.11]
 * getHslaStringValues({h:1, s:1, l:1, a:1.111})
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
 * @example
 * // returns [1,1,1,1]
 * getCmykStringValues({c:1, m:1, y:1, k:1})
 */
function getCmykStringValues(color) {
    return [
        round2decimal(color.c),
        round2decimal(color.m),
        round2decimal(color.y),
        round2decimal(color.k)
    ];
}
/**
 * Represents a Color
 * @constructor
 */
function Color(value) {
    var self = this;
    // default to black
    var currentColor = { r:0, g:0, b:0, a:1 };
    var currentHslColor = { h:0, s:0, l:0, a:1 };

    // Object getters
    self.getRgba = function () {
        return clone(currentColor);
    };
    self.getRgb = function () {
        var retval = clone(currentColor);
        delete retval.a;
        return retval;
    };
    self.getHsla = function () {
        return clone(currentHslColor);
    };
    self.getHsl = function () {
        var retval = clone(currentHslColor);
        delete retval.a;
        return retval;
    };
    self.getCmyk = function () {
        return rgb2cmyk(currentColor);
    };
    // String getters
    self.getRgbaString = function () {
        return 'rgba(' + getRgbaStringValues(currentColor).join()  + ')';
    };
    self.getRgbString = function () {
        var values = getRgbaStringValues(currentColor);
        values.pop();
        return 'rgb(' + values.join() + ')';
    };
    self.getHexaString = function () {
        return rgb2hexa(currentColor);
    };
    self.getHexString = function () {
        return rgb2hexa(currentColor).substring(0, 7);
    };
    self.getHslaString = function () {
        return 'hsla(' + getHslaStringValues(currentHslColor).join()  + ')';
    };
    self.getHslString = function () {
        var values = getHslaStringValues(currentHslColor);
        values.pop();
        return 'hsl(' + values.join() + ')';
    };
    self.getCmykString = function () {
        // http://www.w3.org/TR/css3-gcpm/#cmyk-colors
        var values = getCmykStringValues(rgb2cmyk(currentColor));
        return 'device-cmyk(' + values.join() + ')';
    };
    // Contrasting color getter
    self.getTextColor = function () {
        // See BT 709 color spec
        var luma = currentColor.r*0.2126 + currentColor.g*0.7152 + currentColor.b*0.0722;
        return new Color(luma < 0.35 ? '#fff' : '#000');
    };
    // Color setter
    self.setColor = function (color) {
        var retval = parse(color);
        if (retval) {
            if (retval.rgba && retval.hsla) {
                currentColor    = retval.rgba;
                currentHslColor = retval.hsla;
            } else if (retval.rgba) {
                currentColor    = retval.rgba;
                currentHslColor = rgb2hsl(retval.rgba);
            } else {
                currentColor    = hsl2rgb(retval.hsla);
                currentHslColor = retval.hsla;
            }
        }
        return self;
    };
    // Alpha setter
    self.setAlpha = function (value) {
        value = parseFloat(value);
        if (! isNaN(value) && value >= 0 && value <= 1) {
            currentColor.a = value;
            currentHslColor.a = value;
        }
        return self;
    };
    // Alpha getter
    self.getAlpha = function () {
        return currentColor.a;
    };
    // Set to input color
    self.setColor(value);
}

return Color;

}(Math));