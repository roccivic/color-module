describe("Malformed, valid, input", function () {
	it("Set HEX string with whitespace", function () {
		var color = new Color('  #123456  ');
	    expect(color.getHexString()).toBe('#123456');
	});
	it("Set RGB string with extra whitespace", function () {
		var color = new Color('rgb(12,34,56)  ');
	    expect(color.getRgbString()).toBe('rgb(12,34,56)');

		color = new Color('  rgb(12,34,56)');
	    expect(color.getRgbString()).toBe('rgb(12,34,56)');

		color = new Color('rgb ( 12 , 34 , 56 )');
	    expect(color.getRgbString()).toBe('rgb(12,34,56)');
	});
	it("Set RGBA string with extra whitespace", function () {
		var color = new Color('rgba(12,34,56,.5)  ');
	    expect(color.getRgbaString()).toBe('rgba(12,34,56,0.5)');

		color = new Color('  rgba(12,34,56,.5)');
	    expect(color.getRgbaString()).toBe('rgba(12,34,56,0.5)');

		color = new Color('rgba ( 12 , 34 , 56 ,.5)');
	    expect(color.getRgbaString()).toBe('rgba(12,34,56,0.5)');
	});
	it("Set HSL string with extra whitespace", function () {
		var color = new Color('hsl(12,34%,56%)  ');
	    expect(color.getHslString()).toBe('hsl(12,34%,56%)');

		color = new Color('  hsl(12,34%,56%)');
	    expect(color.getHslString()).toBe('hsl(12,34%,56%)');

		color = new Color('hsl ( 12 , 34% , 56% )');
	    expect(color.getHslString()).toBe('hsl(12,34%,56%)');
	});
	it("Set HSLA string with extra whitespace", function () {
		var color = new Color('hsla(12,34%,56%,.5)  ');
	    expect(color.getHslaString()).toBe('hsla(12,34%,56%,0.5)');

		color = new Color('  hsla(12,34%,56%,.5)');
	    expect(color.getHslaString()).toBe('hsla(12,34%,56%,0.5)');

		color = new Color('hsla ( 12 , 34% , 56% , .5)');
	    expect(color.getHslaString()).toBe('hsla(12,34%,56%,0.5)');
	});
	it("Set CMYK string with extra whitespace", function () {
		var color = new Color('device-cmyk(0,.25,.5,.81)  ');
	    expect(color.getCmykString()).toBe('device-cmyk(0,0.25,0.5,0.81)');

		color = new Color('  device-cmyk(0,.25,.5,.81)');
	    expect(color.getCmykString()).toBe('device-cmyk(0,0.25,0.5,0.81)');

		color = new Color('device-cmyk ( 0 , .25 , .5 , .81 )');
	    expect(color.getCmykString()).toBe('device-cmyk(0,0.25,0.5,0.81)');
	});
	it("Set RGB string object", function () {
		var color = new Color({
			r: "0.1",
			g: "0.2",
			b: "0.3"
		});
		expect(color.getRgb()).toEqual({ r:0.1, g:0.2, b:0.3 });
		color = new Color({
			r: ".1",
			g: ".2",
			b: ".3"
		});
		expect(color.getRgb()).toEqual({ r:0.1, g:0.2, b:0.3 });
	});
	it("Set RGBA string object", function () {
		var color = new Color({
			r: "0.1",
			g: "0.2",
			b: "0.3",
			a: "0.4"
		});
		expect(color.getRgba()).toEqual({ r:0.1, g:0.2, b:0.3, a:0.4 });
		color = new Color({
			r: ".1",
			g: ".2",
			b: ".3",
			a: ".4"
		});
		expect(color.getRgba()).toEqual({ r:0.1, g:0.2, b:0.3, a:0.4 });
	});
	it("Set HSL string object", function () {
		var color = new Color({
			h: "0",
			s: "1",
			l: "0.34"
		});
		expect(color.getHsl()).toEqual({ h:0, s:1, l:0.34 });
		color = new Color({
			h: "0",
			s: "1",
			l: ".34"
		});
		expect(color.getHsl()).toEqual({ h:0, s:1, l:0.34 });
	});
	it("Set HSLA string object", function () {
		var color = new Color({
			h: "0",
			s: "1",
			l: "0.34",
			a: "0.45"
		});
		expect(color.getHsla()).toEqual({ h:0, s:1, l:0.34, a:0.45 });
		color = new Color({
			h: "0",
			s: "1",
			l: ".34",
			a: ".45"
		});
		expect(color.getHsla()).toEqual({ h:0, s:1, l:0.34, a:0.45 });
	});
});