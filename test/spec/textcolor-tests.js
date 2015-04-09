describe("Textcolor test", function () {
    it("getTextColor test", function () {
    	var color = new Color();
    	expect(color.getTextColor().getHexString()).toBe('#ffffff');

    	color.setColor('#fff');
    	expect(color.getTextColor().getHexString()).toBe('#000000');	
    });
});