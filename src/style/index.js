function setStyle(el, styles) {
    for (var key in styles) {
        el.style[key] = styles[key];
    }
}

function getStyle(el, name) {

    // 获取结点的全部样式
    var allStyle = document.defaultView && document.defaultView.getComputedStyle ?
        document.defaultView.getComputedStyle(el, null) :
        el.currentStyle;

    // 如果没有指定属性名称，返回全部样式
    return typeof name === 'string' ?
        allStyle.getPropertyValue(name) :
        allStyle;

}