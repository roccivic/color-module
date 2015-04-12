// Color parser
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
function parseString(value) {
    var parts, i, alpha, hue, retval = {};
    value = value.replace(/\s+/g, '');
    if (/^#/.test(value)) { // hex
        if (/^#([0-9a-f]{3}){1,2}$/i.test(value)) {
            if (value.length === 4) {
                value = value.replace(/[0-9a-f]/gi, replaceCallback);
            }
            retval = hexa2rgb(value);
            retval.a = 1;
            return { rgba: retval };
        } else if (/^#([0-9a-f]{4}){1,2}$/i.test(value)) {
            if (value.length === 5) {
                value = value.replace(/[0-9a-f]/gi, replaceCallback);
            }
            retval = hexa2rgb(value);
            return { rgba: retval };
        }
    } else if (/^rgba/.test(value)) {
        parts = value.match(/^rgba\((\d+%?),(\d+%?),(\d+%?),(\.\d+|\d+\.?\d*)\)$/);
        if (parts && parts.length === 5) {
            parts.shift();
            alpha = parts.pop() / 1; // Divide by 1 to convert string to number
            if (alpha > 1) {
                alpha = 1;
            }
            parts = parseChannelValues(parts);
            retval.r = parts[0];
            retval.g = parts[1];
            retval.b = parts[2];
            retval.a = alpha;
            return { rgba: retval };
        }
    } else if (/^rgb/.test(value)) {
        parts = value.match(/^rgb\((\d+%?),(\d+%?),(\d+%?)\)$/);
        if (parts && parts.length === 4) {
            parts.shift();
            parts = parseChannelValues(parts);
            retval.r = parts[0];
            retval.g = parts[1];
            retval.b = parts[2];
            retval.a = 1;
            return { rgba: retval };
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
    } else if (/^hsl/.test(value)) {
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
            retval = cmyk2rgb({
                c: parts[0],
                m: parts[1],
                y: parts[2],
                k: parts[3]
            });
            return { rgba: retval };
        }
    }
}
function parseObject(value) {
    var alpha, retval = {};
    value = clone(value, parseFloat);
    if (haveFields(value, 'sl') && ! isNaN(value.h)) {
        value.h = value.h - Math.floor(value.h);
        retval = value;
        alpha = 1;
        if (haveFields(value, 'a')) {
            alpha = value.a;
        }
        retval.a = alpha;
        return { hsla: retval };
    } else if (haveFields(value, 'rgb')) {
        retval = value;
        alpha = 1;
        if (haveFields(value, 'a')) {
            alpha = value.a;
        }
        retval.a = alpha;
        return { rgba: retval };
    } else if (haveFields(value, 'cmyk')) {
        retval = cmyk2rgb(value);
        retval.a = 1;
        return { rgba: retval };
    }
}
function parse(value) {
    if (typeof value === 'string') {
        return parseString(value);
    } else if (value instanceof Color) {
        return { rgba: clone(value.getRgba()) };
    } else if (typeof value === 'object') {
        return parseObject(value);
    }
}