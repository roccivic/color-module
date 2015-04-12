// Prepare values for display in strings
function round1decimal(i) {
    return round(i * 100) / 100;
}
function getRgbaStringValues(color) {
    return [
        round(color.r * 255),
        round(color.g * 255),
        round(color.b * 255),
        round1decimal(color.a)
    ];
}
function getHslaStringValues(color) {
    return [
        round(color.h * 360),
        round(color.s * 100) + '%',
        round(color.l * 100) + '%',
        round1decimal(color.a)
    ];
}
function getCmykStringValues(color) {
    return [
        round1decimal(color.c),
        round1decimal(color.m),
        round1decimal(color.y),
        round1decimal(color.k)
    ];
}