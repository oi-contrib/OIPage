interface animationResult {

    /**
     * 一个函数，调用该函数，可以提前结束动画
     */
    stop(): void

    /**
     * 一个函数，调用该函数，可以暂停动画
     */
    pause(): void

    /**
     * 一个函数，调用该函数，可以继续动画启动暂停的动画
     */
    resume(): void
}

interface animationFun {
    (deep: number): void
}

/**
 * 轮询动画
 */
export interface animationType {
    (doback: animationFun, duration?: number, callback?: animationFun): animationResult
}

export let animation: animationType