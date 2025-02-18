export interface inputType {
    type: string
    label: string
}

export interface selectType extends inputType {
    value: Array<string>
}

/**
 * 表单输入
 * @param form 表单内容
 * @returns 返回一个结果数组
 */
export interface logformType {
    (config: Array<inputType | selectType>): Promise<Array<string | number>>
}

export let deeplog: logformType