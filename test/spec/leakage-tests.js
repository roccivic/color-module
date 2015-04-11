describe("Leakage tests", function () {
    Object.prototype.method_name = function() {
        // Dummy extension of the Object class
    };
    it("Instanciate Color from another Color object", function () {
        var rgba = 'rgba(125,125,125,0.8)';
        var color1 = new Color(rgba);
        var color2 = new Color(color1);
        expect(color2.getRgbaString()).toBe(rgba);
        color1.setAlpha(0);
        expect(color2.getRgbaString()).toBe(rgba);
    });

    it("Instanciate Color from a plain object", function () {
        var rgba1 = {
            r: 0.5,
            g: 0.5,
            b: 0.5,
            a: 0.5
        };
        var rgba2 = {
            r: 0.5,
            g: 0.5,
            b: 0.5,
            a: 0.5
        };
        var color1 = new Color(rgba1);
        rgba1.r = 1;
        expect(color1.getRgba()).toEqual(rgba2);

        var hsl1 = {
            h: 0.5,
            s: 0.5,
            l: 0.5
        };
        var hsl2 = {
            h: 0.5,
            s: 0.5,
            l: 0.5
        };
        color1 = new Color(hsl1);
        hsl1.h = 1;
        expect(color1.getHsl()).toEqual(hsl2);

        var cmyk1 = {
            c: 0,
            m: 0.5,
            y: 0.5,
            k: 0
        };
        var cmyk2 = {
            c: 0,
            m: 0.5,
            y: 0.5,
            k: 0
        };
        color1 = new Color(cmyk1);
        cmyk1.m = 1;
        expect(color1.getCmyk()).toEqual(cmyk2);
    });


    it("Output color leakage", function () {
        var rgba1 = {
            r: 0.5,
            g: 0.5,
            b: 0.5,
            a: 0.5
        };
        var color1 = new Color(rgba1);
        var rgba2 = color1.getRgba();
        rgba2.r = 1;
        rgba2.a = 0;
        expect(color1.getRgba()).toEqual(rgba1);
        var rgb1 = {
            r: 0.5,
            g: 0.5,
            b: 0.5
        };
        color1 = new Color(rgb1);
        var rgb2 = color1.getRgb();
        rgba2.r = 1;
        expect(color1.getRgb()).toEqual(rgb1);

        var hsla1 = {
            h: 0.5,
            s: 0.5,
            l: 0.5,
            a: 0.5
        };
        color1 = new Color(hsla1);
        var hsla2 = color1.getHsla();
        hsla2.s = 1;
        hsla2.a = 0;
        expect(color1.getHsla()).toEqual(hsla1);
        var hsl1 = {
            h: 0.5,
            s: 0.5,
            l: 0.5
        };
        color1 = new Color(hsl1);
        var hsl2 = color1.getHsl();
        hsla2.s = 1;
        expect(color1.getHsl()).toEqual(hsl1);
    });
});