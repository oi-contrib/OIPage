/**
 * 设置节点样式
 */
export interface setStyleType {
    (el: HTMLElement, styles: {
        [key: string]: string | number
    }): void
}

export let setStyle: setStyleType

/**
 * 获取节点样式
 */
export interface getStyleType {
    (el: HTMLElement, name: string): string
    (el: HTMLElement): {
        [key: string]: string
    }
}

export let getStyle: getStyleType