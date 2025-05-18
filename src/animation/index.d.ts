interface animationResult {

    /**
     * 一个函数，调用该函数，可以提前结束动画
     */
    stop(): void
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