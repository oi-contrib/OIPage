/**
 * 获取一个值的类型字符串[object type]
 */
export interface getTypeType {
    (value: any): string
}

export let getType: getTypeType

/**
 * 判断一个值是不是一个朴素的'对象'
 */
export interface isPlainObjectType {
    (value: any): boolean
}

export let isPlainObject: isPlainObjectType