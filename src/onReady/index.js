function onReady(callback) {
    var readyState = document.readyState;
    if (readyState === 'interactive' || readyState === 'complete') {
        callback();
    } else {
        window.addEventListener("DOMContentLoaded", callback);
    }
}