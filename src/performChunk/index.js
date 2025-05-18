function performChunk(chunkFun) {
    let isRuning = true;

    function run() {
        if (!isRuning) return;

        // 被调度为一个任务队列中的回调函数，仅在浏览器空闲时执行
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
        requestIdleCallback(function (idle) {

            // 如果当前剩余时间还有，且还有剩余任务
            while (idle.timeRemaining() > 0 && isRuning) {
                isRuning = chunkFun()
            }
            run();
        });
    }
    run();
}