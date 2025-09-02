/**
 * 数字格式化
 */
export interface numberFormatType {
    (input: number | string): string
}

export let numberFormat: numberFormatType

/**
 * 日期格式化
 */
export interface dateFormatType {
    (input?: string | Date, option?: {

        /**
         * 输入格式
         */
        inputFormat?: string

        /**
         * 输出格式
         */
        format?: string
    }): string
}

export let dateFormat: dateFormatType

