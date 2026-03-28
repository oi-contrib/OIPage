/**
 * 初始化配置
 */
export interface initOptionType {
    (setOption: any, defaultOption: any): any
}

export let initOption: initOptionType

/**
 * 合并配置
 */
export interface mergeOptionType {
    (oldOption: any, newOption: any): void
}

export let mergeOption: mergeOptionType