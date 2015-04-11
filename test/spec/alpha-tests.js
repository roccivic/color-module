describe("Alpha test:", function () {
    "use strict";
    describe("getAlpha:", function () {
        it("defaults to 1", function () {
            var color = new Color();
            expect(color.getAlpha()).toBe(1);
        });
        it("can be set to 0", function () {
            var color = new Color();
            color.setColor('#fff0');
            expect(color.getAlpha()).toBe(0);  
        });
        it("can be set to 0.5", function () {
            var color = new Color();
            color.setColor({ h:0, s:0, l:0, a:0.5 });
            expect(color.getAlpha()).toBe(0.5);
        });
    });
    describe("setAlpha:", function () {
        it("can be set to 1", function () {
            var color = new Color();
            color.setAlpha(1);
            expect(color.getAlpha()).toBe(1);
        });
        it("can be set to 0.5", function () {
            var color = new Color();
            color.setAlpha(0.5);
            expect(color.getAlpha()).toBe(0.5);
        });
        it("cannot be set to 5.7", function () {
            var color = new Color();
            color.setAlpha(0.5);
            color.setAlpha(5.7);
            expect(color.getAlpha()).toBe(0.5);
        });
    });
});