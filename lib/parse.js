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
function parse(value, currentColor, currentHslColor, isHsl) {
    var parts, i, alpha, hue;
    if (typeof value === 'string') {
        value = value.replace(/\s+/g, '');
        if (/^#/.test(value)) { // hex
            if (/^#([0-9a-f]{3}){1,2}$/i.test(value)) {
                if (value.length === 4) {
                    value = value.replace(/[0-9a-f]/gi, replaceCallback);
                }
                currentColor = hexa2rgb(value);
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
                parts = parseChannelValues(parts);
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
                parts = parseChannelValues(parts);
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
                parts = parseChannelValues(parts);
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
                parts = parseChannelValues(parts);
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