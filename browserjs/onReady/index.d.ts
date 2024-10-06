/**
 * 等待DOM加载完毕执行
 */
export interface onReadyType {
    (callback: Function): void
}

export let onReady: onReadyType