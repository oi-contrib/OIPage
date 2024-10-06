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