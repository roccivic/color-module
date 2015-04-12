/**
 * COLOR MANAGEMENT
 */
var Color = (function (Math) {
    "use strict";
    var round = Math.round;
    function Color(value) {
        var self = this;
        // default to black
        var currentColor = { r:0, g:0, b:0, a:1 };
        var currentHslColor = { h:0, s:0, l:0, a:1 };
        var isHsl = false;

        // Object getters
        self.getRgba = function () {
            return clone(currentColor);
        };
        self.getRgb = function () {
            var retval = {};
            retval.r = currentColor.r;
            retval.g = currentColor.g;
            retval.b = currentColor.b;
            return retval;
        };
        self.getHsla = function () {
            return clone(currentHslColor);
        };
        self.getHsl = function () {
            var retval = {};
            retval.h = currentHslColor.h;
            retval.s = currentHslColor.s;
            retval.l = currentHslColor.l;
            return retval;
        };
        self.getCmyk = function () {
            return rgb2cmyk(currentColor);
        };
        // String getters
        self.getRgbaString = function () {
            return 'rgba(' + round(currentColor.r * 255) + ',' + round(currentColor.g * 255) + ',' + round(currentColor.b * 255) + ',' + round(currentColor.a * 100) / 100  + ')';
        };
        self.getRgbString = function () {
            return 'rgb(' + round(currentColor.r * 255) + ',' + round(currentColor.g * 255) + ',' + round(currentColor.b * 255) + ')';
        };
        self.getHexaString = function () {
            var byte = round(currentColor.a * 255);
            var value = byte.toString(16);
            if (byte < 16) {
                value = "0" + value;
            }
            return rgb2hex(currentColor) + value;
        };
        self.getHexString = function () {
            return rgb2hex(currentColor);
        };
        self.getHslaString = function () {
            return 'hsla(' + round(currentHslColor.h * 360) + ',' + round(currentHslColor.s * 100) + '%,' + round(currentHslColor.l * 100) + '%,' + round(currentHslColor.a * 100) / 100  + ')';
        };
        self.getHslString = function () {
            return 'hsl(' + round(currentHslColor.h * 360) + ',' + round(currentHslColor.s * 100) + '%,' + round(currentHslColor.l * 100) + '%)';
        };
        self.getCmykString = function () {
            // http://www.w3.org/TR/css3-gcpm/#cmyk-colors
            var cmyk = rgb2cmyk(currentColor);
            return 'device-cmyk(' + round(cmyk.c * 100) / 100 + ',' + round(cmyk.m * 100) / 100 + ',' + round(cmyk.y * 100) / 100 + ',' + round(cmyk.k * 100) / 100 + ')';
        };
        // Contrasting color getter
        self.getTextColor = function () {
            // See BT 709 color spec
            var luma = currentColor.r*0.2126 + currentColor.g*0.7152 + currentColor.b*0.0722;
            return new Color(luma < 0.35 ? '#fff' : '#000');
        };
        // Color setter
        self.setColor = function (color) {
            var retval      = setColor(color, currentColor, currentHslColor, isHsl);
            currentColor    = retval.rgba;
            currentHslColor = retval.hsla;
            isHsl           = retval.isHsl;
            return self;
        };
        self.setAlpha = function (value) {
            value = parseFloat(value);
            if (! isNaN(value) && value >= 0 && value <= 1) {
                currentColor.a = value;
                currentHslColor.a = value;
            }
            return self;
        };
        self.getAlpha = function () {
            return currentColor.a;
        };
        // Set to input color
        self.setColor(value);
    }

    // Color setter
    function setColor(value, currentColor, currentHslColor, isHsl) {
        var parts, i, alpha, hue;
        if (typeof value === 'string') {
            value = value.replace(/\s+/g, '');
            if (/^#/.test(value)) { // hex
                if (/^#([0-9a-f]{3}){1,2}$/i.test(value)) {
                    if (value.length === 4) {
                        value = value.replace(/[0-9a-f]/gi, replaceCallback);
                    }
                    currentColor = hex2rgb(value);
                    currentColor.a = 1;
                    isHsl = false;
                } else if (/^#([0-9a-f]{4}){1,2}$/i.test(value)) {
                    if (value.length === 5) {
                        value = value.replace(/[0-9a-f]/gi, replaceCallback);
                    }
                    currentColor = hexa2rgb(value);
                    isHsl = false;
                }
            } else if (/^rgba/.test(value)) {
                parts = value.match(/^rgba\((\d+%?),(\d+%?),(\d+%?),(\.\d+|\d+\.?\d*)\)$/);
                if (parts && parts.length === 5) {
                    parts.shift();
                    alpha = parts.pop() / 1; // Divide by 1 to convert string to number
                    if (alpha > 1) {
                        alpha = 1;
                    }
                    for (i=0; i<parts.length; i++) {
                        if (parts[i].indexOf('%') !== -1) {
                            parts[i] = parts[i].substr(0, parts[i].length - 1) / 100;
                        } else {
                            parts[i] = parts[i] / 255;
                        }
                        if (parts[i] > 1) {
                            parts[i] = 1;
                        }
                    }
                    currentColor.r = parts[0];
                    currentColor.g = parts[1];
                    currentColor.b = parts[2];
                    currentColor.a = alpha;
                    isHsl = false;
                }
            } else if (/^rgb/.test(value)) {
                parts = value.match(/^rgb\((\d+%?),(\d+%?),(\d+%?)\)$/);
                if (parts && parts.length === 4) {
                    parts.shift();
                    for (i=0; i<parts.length; i++) {
                        if (parts[i].indexOf('%') !== -1) {
                            parts[i] = parts[i].substr(0, parts[i].length - 1) / 100;
                        } else {
                            parts[i] = parts[i] / 255;
                        }
                        if (parts[i] > 1) {
                            parts[i] = 1;
                        }
                    }
                    currentColor.r = parts[0];
                    currentColor.g = parts[1];
                    currentColor.b = parts[2];
                    currentColor.a = 1;
                    isHsl = false;
                }
            } else if (/^hsla/.test(value)) {
                parts = value.match(/^hsla\((-?\d+),(\d+%),(\d+%),(\.\d+|\d+\.?\d*)\)$/);
                if (parts && parts.length === 5) {
                    parts.shift();
                    hue = parts.shift() / 360;
                    hue = hue - Math.floor(hue);
                    alpha = parts.pop() / 1; // Divide by 1 to convert string to number
                    if (alpha > 1) {
                        alpha = 1;
                    }
                    for (i=0; i<parts.length; i++) {
                        parts[i] = parts[i].substr(0, parts[i].length - 1) / 100;
                        if (parts[i] > 1) {
                            parts[i] = 1;
                        }
                    }
                    isHsl = true;
                    currentHslColor = {
                        h: hue,
                        s: parts[0],
                        l: parts[1],
                        a: alpha
                    };
                }
            } else if (/^hsl/.test(value)) {
                parts = value.match(/^hsl\((-?\d+),(\d+%),(\d+%)\)$/);
                if (parts && parts.length === 4) {
                    parts.shift();
                    hue = parts.shift() / 360;
                    hue = hue - Math.floor(hue);
                    for (i=0; i<parts.length; i++) {
                        parts[i] = parts[i].substr(0, parts[i].length - 1) / 100;
                        if (parts[i] > 1) {
                            parts[i] = 1;
                        }
                    }
                    isHsl = true;
                    currentHslColor = {
                        h: hue,
                        s: parts[0],
                        l: parts[1],
                        a: 1
                    };
                }
            } else if (/^device-cmyk/.test(value)) {
                parts = value.match(/^device-cmyk\((\.\d+|\d+\.?\d*),(\.\d+|\d+\.?\d*),(\.\d+|\d+\.?\d*),(\.\d+|\d+\.?\d*)\)$/);
                if (parts && parts.length === 5) {
                    parts.shift();
                    for (i=0; i<parts.length; i++) {
                        parts[i] = parts[i] / 1; // Divide by 1 to convert string to number
                        if (parts[i] > 1) {
                            parts[i] = 1;
                        }
                    }
                    currentColor = cmyk2rgb({
                        c: parts[0],
                        m: parts[1],
                        y: parts[2],
                        k: parts[3]
                    });
                    isHsl = false;
                }
            }
        } else if (value instanceof Color) {
            currentColor = clone(value.getRgba());
            isHsl = false;
        } else if (typeof value === 'object') {
            var clonedValue = clone(value, parseFloat);
            if (haveFields(clonedValue, 'sl') && ! isNaN(clonedValue.h)) {
                isHsl = true;
                clonedValue.h = clonedValue.h - Math.floor(clonedValue.h);
                currentHslColor = clonedValue;
                alpha = 1;
                if (haveFields(clonedValue, 'a')) {
                    alpha = clonedValue.a;
                }
                currentHslColor.a = alpha;
            } else if (haveFields(clonedValue, 'rgb')) {
                currentColor = clonedValue;
                alpha = 1;
                if (haveFields(clonedValue, 'a')) {
                    alpha = clonedValue.a;
                }
                currentColor.a = alpha;
                isHsl = false;
            } else if (haveFields(clonedValue, 'cmyk')) {
                currentColor = cmyk2rgb(clonedValue);
                currentColor.a = 1;
                isHsl = false;
            }
        }
        if (isHsl) {
            return {
                rgba: hsl2rgb(currentHslColor),
                hsla: currentHslColor,
                isHsl: isHsl
            };
        } else {
            return {
                rgba: currentColor,
                hsla: rgb2hsl(currentColor),
                isHsl: isHsl
            };
        }
    }

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

    // converters
    function rgb2hex(input) {
        var value, byte, retval = '', i=0;
        for (;i<3;i++) {
            byte = round(input[['r','g','b'][i]] * 255);
            value = byte.toString(16);
            if (byte < 16) {
                value = "0" + value;
            }
            retval += value;
        }
        return '#' + retval;

    }
    function hex2rgb(value) {
        var i=0, retval = {};
        for (;i<3;i++) {
            retval[i] = parseInt('0x' + value.substring(i*2+1,i*2+3), 16) / 255;
        }
        return {
            r: retval[0],
            g: retval[1],
            b: retval[2]
        };
    }
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
    function cmyk2rgb(value) {
        return {
            r: 1 - Math.min(1, value.c * (1 - value.k) + value.k),
            g: 1 - Math.min(1, value.m * (1 - value.k) + value.k),
            b: 1 - Math.min(1, value.y * (1 - value.k) + value.k),
            a: 1
        };
    }
    return Color;
})(Math);