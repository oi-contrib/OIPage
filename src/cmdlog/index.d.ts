/**
 * 单行打印
 * @param stream 打印的内容
 */
export interface linelogType {
    (stream: string): void
}

export let linelog: linelogType

/**
 * 进度打印
 * @param percentum 进度0-100 
 * @param stream 说明文字,可选
 */
export interface deeplogType {
    (percentum: number, stream?: string): void
}

export let deeplog: deeplogType
