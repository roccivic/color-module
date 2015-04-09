describe("Malformed, invalid, input", function () {
    it("Setting invalid color shouldn't corrupt previous value", function () {
    	var color = new Color('#123456');

    	color.setColor('foobar');
        expect(color.getHexString()).toBe('#123456');

    	color.setColor({ h: 0.2, s: 0.3, v: 0.4 });
        expect(color.getHexString()).toBe('#123456');

        color.setColor('rgb(,,,)');
        expect(color.getHexString()).toBe('#123456');

        color.setColor('rgb(0,0)');
        expect(color.getHexString()).toBe('#123456');

        color.setColor('rgb(1,0,0');
        expect(color.getHexString()).toBe('#123456');

        color.setColor('rgb(10%,10%,10%,10%)');
        expect(color.getHexString()).toBe('#123456');

        color.setColor('rgb(%,%,%,1)');
        expect(color.getHexString()).toBe('#123456');

        color.setColor('hsl(');
        expect(color.getHexString()).toBe('#123456');

        color.setColor('hsla(1,2,3,4)');
        expect(color.getHexString()).toBe('#123456');

        color.setColor('hsl(1,2,3)');
        expect(color.getHexString()).toBe('#123456');
    });
});