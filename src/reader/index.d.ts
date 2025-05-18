/**
 * 文本分析读取器
 */

export interface readerInstanceType {

    /**
     * 当前字符位置
     */
    index: number

    /**
     * 当前字符内容
     */
    value: string

    /**
     * 读取下一个字符
     */
    readNext(): string

    /**
     * 获取往后count个值
     * @param count 
     */
    getNextN(count: number): string
}

export interface readerType {
    (plain: string): readerInstanceType
}

export let reader: readerType