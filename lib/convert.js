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