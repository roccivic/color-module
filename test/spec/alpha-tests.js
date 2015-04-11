describe("Alpha test", function () {
    it("getAlpha", function () {
        var color = new Color();
        expect(color.getAlpha()).toBe(1);

        color.setColor('#fff0');
        expect(color.getAlpha()).toBe(0);  

        color.setColor({ h:0, s:0, l:0, a:0.5 });
        expect(color.getAlpha()).toBe(0.5);   
    });
    it("setAlpha", function () {
        var color = new Color();
        color.setAlpha(1);
        expect(color.getAlpha()).toBe(1);
        color.setAlpha(0.5);
        expect(color.getAlpha()).toBe(0.5);
        color.setAlpha(5.7);
        expect(color.getAlpha()).toBe(0.5);
    });
});