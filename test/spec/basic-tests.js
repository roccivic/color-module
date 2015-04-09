describe("Basic, valid input, tests", function () {
    it("Set RGB object test", function () {
        var color = new Color({
            r: 12 / 255,
            g: 34 / 255,
            b: 56 / 255
        });
        expect(color.getRgbString()).toBe('rgb(12,34,56)');
        expect(color.getRgbaString()).toBe('rgba(12,34,56,1)');
    });
    it("Set RGBA object test", function () {
        var color = new Color({
            r: 12 / 255,
            g: 34 / 255,
            b: 56 / 255,
            a: 0.67
        });
        expect(color.getRgbString()).toBe('rgb(12,34,56)');
        expect(color.getRgbaString()).toBe('rgba(12,34,56,0.67)');
    });
    it("Set HSL object test", function () {
        var color = new Color({
            h: 0.1,
            s: 0.23,
            l: 0.34
        });
        expect(color.getHslString()).toBe('hsl(36,23%,34%)');
        expect(color.getHslaString()).toBe('hsla(36,23%,34%,1)');
    });
    it("Set HSLA object test", function () {
        var color = new Color({
            h: 0.1,
            s: 0.23,
            l: 0.34,
            a: 0.45
        });
        expect(color.getHslString()).toBe('hsl(36,23%,34%)');
        expect(color.getHslaString()).toBe('hsla(36,23%,34%,0.45)');
    });
    it("Set CMYK object test", function () {
        var color = new Color({
            c: 0,
            m: 0.25,
            y: 0.5,
            k: 0.81
        });
        expect(color.getCmykString()).toBe('device-cmyk(0,0.25,0.5,0.81)');
    });
    it("Set RGB string test", function () {
        var color = new Color('rgb(12,34,56)');
        expect(
            color.getRgb()
        ).toEqual(
            {
                r: 12 / 255,
                g: 34 / 255,
                b: 56 / 255
            }
        );
        expect(
            color.getRgba()
        ).toEqual(
            {
                r: 12 / 255,
                g: 34 / 255,
                b: 56 / 255,
                a: 1
            }
        );
    });
    it("Set RGBA string test", function () {
        var color = new Color('rgba(12,34,56,0.33)');
        expect(
            color.getRgb()
        ).toEqual(
            {
                r: 12 / 255,
                g: 34 / 255,
                b: 56 / 255
            }
        );
        expect(
            color.getRgba()
        ).toEqual(
            {
                r: 12 / 255,
                g: 34 / 255,
                b: 56 / 255,
                a: 0.33
            }
        );
    });
    it("Set RGB string test", function () {
        var color = new Color('rgb(20%,30%,40%)');
        expect(
            color.getRgb()
        ).toEqual(
            {
                r: 0.2,
                g: 0.3,
                b: 0.4
            }
        );
        expect(
            color.getRgba()
        ).toEqual(
            {
                r: 0.2,
                g: 0.3,
                b: 0.4,
                a: 1
            }
        );
    });
    it("Set RGBA string test", function () {
        var color = new Color('rgba(20%,30%,40%,0.33)');
        expect(
            color.getRgb()
        ).toEqual(
            {
                r: 0.2,
                g: 0.3,
                b: 0.4
            }
        );
        expect(
            color.getRgba()
        ).toEqual(
            {
                r: 0.2,
                g: 0.3,
                b: 0.4,
                a: 0.33
            }
        );
    });
    it("Set HSL string test", function () {
        var color = new Color('hsl(36,20%,34%)');
        expect(
            color.getHsl()
        ).toEqual(
            {
                h: 0.1,
                s: 0.2,
                l: 0.34
            }
        );
        expect(
            color.getHsla()
        ).toEqual(
            {
                h: 0.1,
                s: 0.2,
                l: 0.34,
                a: 1
            }
        );
    });
    it("Set HSLA string test", function () {
        var color = new Color('hsla(72,33%,34%,0.45)');
        expect(
            color.getHsl()
        ).toEqual(
            {
                h: 0.2,
                s: 0.33,
                l: 0.34
            }
        );
        expect(
            color.getHsla()
        ).toEqual(
            {
                h: 0.2,
                s: 0.33,
                l: 0.34,
                a: 0.45
            }
        );
    });
    it("Set HSLA string test", function () {
        var color = new Color('hsla(56,77%,34%,.45)');
        expect(
            color.getHsl()
        ).toEqual(
            {
                h: 56/360,
                s: 0.77,
                l: 0.34
            }
        );
        expect(
            color.getHsla()
        ).toEqual(
            {
                h: 56/360,
                s: 0.77,
                l: 0.34,
                a: 0.45
            }
        );
    });
    it("Set CMYK string test", function () {
        var color = new Color('device-cmyk(0,0.25,0.5,0.81)');
        expect(
            color.getCmyk()
        ).toEqual(
            {
                c: 0,
                m: 0.25,
                y: 0.5,
                k: 0.81
            }
        );
    });
    it("Set CMYK string test", function () {
        var color = new Color('device-cmyk(0,.25,.5,.81)');
        expect(
            color.getCmyk()
        ).toEqual(
            {
                c: 0,
                m: 0.25,
                y: 0.5,
                k: 0.81
            }
        );
    });
    it("Set HEX string test", function () {
        var color = new Color('#123456');
        expect(
            color.getRgb()
        ).toEqual(
            {
                r: parseInt('0x12', 16) / 255,
                g: parseInt('0x34', 16) / 255,
                b: parseInt('0x56', 16) / 255
            }
        );
    });
    it("Set shortnhand HEX string test", function () {
        var color = new Color('#123');
        expect(
            color.getRgb()
        ).toEqual(
            {
                r: parseInt('0x11', 16) / 255,
                g: parseInt('0x22', 16) / 255,
                b: parseInt('0x33', 16) / 255
            }
        );
    });
    it("Set HEXA string test", function () {
        var color = new Color('#12345678');
        expect(
            color.getRgba()
        ).toEqual(
            {
                r: parseInt('0x12', 16) / 255,
                g: parseInt('0x34', 16) / 255,
                b: parseInt('0x56', 16) / 255,
                a: parseInt('0x78', 16) / 255
            }
        );
    });
    it("Set shortnhand HEXA string test", function () {
        var color = new Color('#1234');
        expect(
            color.getRgba()
        ).toEqual(
            {
                r: parseInt('0x11', 16) / 255,
                g: parseInt('0x22', 16) / 255,
                b: parseInt('0x33', 16) / 255,
                a: parseInt('0x44', 16) / 255
            }
        );
    });
});