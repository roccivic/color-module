describe("Instanciation: defaults to black:", function () {
    "use strict";
    it("RGB object", function() {
        var color = new Color();
        expect(color.getRgb()).toEqual({r:0, g:0, b:0});
    });
    it("RGBA object", function() {
        var color = new Color();
        expect(color.getRgba()).toEqual({r:0, g:0, b:0, a:1});
    });
    it("HSL object", function() {
        var color = new Color();
        expect(color.getHsl()).toEqual({h:0, s:0, l:0});
    });
    it("HSLA object", function() {
        var color = new Color();
        expect(color.getHsla()).toEqual({h:0, s:0, l:0, a:1});
    });
    it("CMYK object", function() {
        var color = new Color();
        expect(color.getCmyk()).toEqual({c:0, m:0, y:0, k:1});
    });

    it("RGB string", function() {
        var color = new Color();
        expect(color.getRgbString()).toBe('rgb(0,0,0)');
    });
    it("RGBA string", function() {
        var color = new Color();
        expect(color.getRgbaString()).toBe('rgba(0,0,0,1)');
    });
    it("HSL string", function() {
        var color = new Color();
        expect(color.getHslString()).toBe('hsl(0,0%,0%)');
    });
    it("HSLA string", function() {
        var color = new Color();
        expect(color.getHslaString()).toBe('hsla(0,0%,0%,1)');
    });
    it("CMYK string", function() {
        var color = new Color();
        expect(color.getCmykString()).toBe('device-cmyk(0,0,0,1)');
    });

    it("HEX string", function() {
        var color = new Color();
        expect(color.getHexString()).toBe('#000000');
    });
    it("HEXA string", function() {
        var color = new Color();
        expect(color.getHexaString()).toBe('#000000ff');
    });
});