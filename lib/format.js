// Prepare values for display in strings
function getRgbaStringValues(color) {
    return [
        round(color.r * 255),
        round(color.g * 255),
        round(color.b * 255),
        round(color.a * 100) / 100
    ];
}
function getHslaStringValues(color) {
    return [
        round(color.h * 360),
        round(color.s * 100) + '%',
        round(color.l * 100) + '%',
        round(color.a * 100) / 100
    ];
}
function getCmykStringValues(color) {
    return [
        round(color.c * 100) / 100,
        round(color.m * 100) / 100,
        round(color.y * 100) / 100,
        round(color.k * 100) / 100
    ];
}