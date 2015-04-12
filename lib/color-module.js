/**
 * COLOR MANAGEMENT
 */

// Constructor
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
        var retval      = parse(color, currentColor, currentHslColor, isHsl);
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