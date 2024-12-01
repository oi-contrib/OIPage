/**
 * 设置节点样式
 */
export interface setStyleType {
    (el: HTMLElement, styles: {
        [key: string]: string | number
    }): void
}

export let setStyle: setStyleType