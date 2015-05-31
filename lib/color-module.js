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