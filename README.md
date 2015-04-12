[![Build Status Badge](https://travis-ci.org/roccivic/color-module.svg?branch=master)](https://travis-ci.org/roccivic/color-module)
[![Coverage Status Badge](https://coveralls.io/repos/roccivic/color-module/badge.svg?branch=master)](https://coveralls.io/r/roccivic/color-module?branch=master)
[![devDependency Status Badge](https://david-dm.org/roccivic/color-module/dev-status.svg)](https://david-dm.org/roccivic/color-module#info=devDependencies)
[![Code Climate Badge](https://codeclimate.com/github/roccivic/color-module/badges/gpa.svg)](https://codeclimate.com/github/roccivic/color-module)
[![MIT License Badge](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/roccivic/color-module/blob/master/LICENCE.txt)
[![Sauce Test Status](https://saucelabs.com/buildstatus/roccivic)](https://saucelabs.com/u/roccivic)

# color-module
Color management module for JavaScript.
* Supports RGBA, HSLA and CMYK, as string or object.
* Can generate a contrasting color.
* Can manipulate the alpha channel alone.

# Building

### Download and extract
```
wget https://github.com/roccivic/color-module/archive/master.zip
unzip master.zip
cd color-module-master
```

### Install dependecies
```
npm install -g grunt-cli
npm install
```

### Run unit tests
Single run:
```
grunt test
```
Watch mode:
```
grunt watch
```

### Create minified library
The library will be in the `dist/` folder.
```
grunt build
```

# Supported color formats
### String color formats
```javascript
// HEX
"#ff8800"
// SHORTHAND HEX (input only)
"#f80"
// HEXA
"#ff8800ff"
// SHORTHAND HEXA (input only)
"#ff8f"
// RGB
"rgb(255,0,186)"
"rgb(100%,0%,20%)"  // input only
// RGBA
"rgba(255,0,186,0.5)"
"rgba(100%,0%,20%,0.5)" // input only
// HSL
"hsl(282,100%,37%)"
// HSLA
"hsla(282,100%,37%,0.5)"
// CMYK
"device-cmyk(0.3,1,0,0.27)"
```

### Object color formats
All values are normalized between 0 and 1, inclusive.
```javascript
// RGB
{ r: 0.27, g: 0.12, b: 0 }
// RGBA
{ r: 0.27, g: 0.12, b: 0, a: 0.5 }
// HSL
{ h: 0.54, s: 0.15, l: 0.33 }
// HSLA
{ h: 0.54, s: 0.15, l: 0.33 a: 0.5 }
// CMYK
{ c: 0.3, m: 1, y: 0, k: 0.27 }
```

# API
### Instanciating
```javascript
// defaults to black
var black = new Color();
// use any supported format from above to create a specific color
var color1 = new Color("#f80");
var color2 = new Color("rgba(255,0,186,0.5)");
var color3 = new Color({ h: 0.54, s: 0.15, l: 0.33 });
// Instanciate a new Color object, using an existing Color object (create copy)
var color4 = new Color(color3);
```

### Setting a color
```javascript
var color = new Color();
// use any supported format from above to set a specific color
color.setColor("#f80");
color.setColor("rgba(255,0,186,0.5)");
color.setColor({ h: 0.54, s: 0.15, l: 0.33 });
// Set the new color, using an existing Color object
var anotherColor = new Color("#0f0");
color.setColor(anotherColor);
```
The `setColor()` method is chainable to allow easy conversions.
```javascript
var color = new Color();
color.setColor("#fff").getRgbaString();
color.setColor("#fff").getHsla();
```

### Getting a color
#### getHexString()
Returns the color as a string in hexadecimal format
```javascript
color.getHexString();
// returns
"#ff8800"
```
#### getHexaString()
Returns the color as a string in hexadecimal format, including the alpha channel
```javascript
color.getHexaString();
// returns
"#ff8800ff"
```
#### getRgbString()
Returns the color as a string in RGB format
```javascript
color.getRgbString();
// returns
"rgb(255,0,186)"
```
#### getRgbaString()
Returns the color as a string in RGBA format
```javascript
color.getRgbaString();
// returns
"rgba(255,0,186,0.5)"
```
#### getHslString()
Returns the color as a string in HSL format
```javascript
color.getHslString();
// returns
"hsl(282,100%,37%)"
```
#### getHslaString()
Returns the color as a string in HSLA format
```javascript
color.getHslaString();
// returns
"hsla(282,100%,37%,0.5)"
```
#### getCmykString()
Returns the color as a string in CMYK format
```javascript
color.getCmykString();
// returns
"device-cmyk(0.3,1,0,0.27)"
```
#### getRgb()
Returns the color an object in RGB format
```javascript
color.getRgb();
// returns
{ r: 0.27, g: 0.12, b: 0 }
```
#### getRgba()
Returns the color an object in RGBA format
```javascript
color.getRgba();
// returns
{ r: 0.27, g: 0.12, b: 0, a: 0.5 }
```
#### getHsl()
Returns the color an object in HSL format
```javascript
color.getHsl();
// returns
{ h: 0.54, s: 0.15, l: 0.33 }
```
#### getHsla()
Returns the color an object in HSLA format
```javascript
color.getHsla();
// returns
{ h: 0.54, s: 0.15, l: 0.33 a: 0.5 }
```
#### getCmyk()
Returns the color as JS object in CMYK format
```javascript
color.getCmyk();
// returns
{ c: 0.3, m: 1, y: 0, k: 0.27 }
```

### Getting a contrasting color
#### getTextColor()
Useful for when you are storing a background color and need to know whther to use white or black as a foreground.
```javascript
var color = new Color("#ff0"); // yellow
color.getTextColor().getHexString();
// returns
"#000"
```

### Manipulating the alpha channel alone
#### getAlpha()
```javascript
var color = new Color({ h: 0.54, s: 0.15, l: 0.33 a: 0.5 });
color.getAlpha();
// returns
0.5
```
#### setAlpha()
```javascript
var color = new Color({ h: 0.54, s: 0.15, l: 0.33 a: 0.5 });
color.setAlpha(color.getAlpha() - 0.1); // lower alpha by 10%
// returns
0.4
```
The `setAlpha()` method is chainable.
```javascript
var color = new Color();
color.setAlpha(0.5).getRgbaString();
```
