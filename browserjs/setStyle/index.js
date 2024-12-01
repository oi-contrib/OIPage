export function setStyle(el, styles) {
    for (var key in styles) {
        el.style[key] = styles[key];
    }
};