
// 目前只提供了一种，直接在浏览器中利用style标签插入样式

export default function addStylesClient(list) {

    let styleElement = document.createElement('style');
    let head = document.head || document.getElementsByTagName('head')[0];

    styleElement.innerHTML = list;
    styleElement.setAttribute('type', 'text/css');
    head.appendChild(styleElement);
};
