describe("Instanciation:", function () {
    "use strict";
    it("defaults to black", function() {
        var color = new Color();
        expect(color.getRgb()).toEqual({r:0, g:0, b:0});
        expect(color.getRgba()).toEqual({r:0, g:0, b:0, a:1});
        expect(color.getHsl()).toEqual({h:0, s:0, l:0});
        expect(color.getHsla()).toEqual({h:0, s:0, l:0, a:1});
        expect(color.getCmyk()).toEqual({c:0, m:0, y:0, k:1});

        expect(color.getRgbString()).toBe('rgb(0,0,0)');
        expect(color.getRgbaString()).toBe('rgba(0,0,0,1)');
        expect(color.getHslString()).toBe('hsl(0,0%,0%)');
        expect(color.getHslaString()).toBe('hsla(0,0%,0%,1)');
        expect(color.getCmykString()).toBe('device-cmyk(0,0,0,1)');
        expect(color.getHexString()).toBe('#000000');
        expect(color.getHexaString()).toBe('#000000ff');
    });
});