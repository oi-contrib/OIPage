/**
 * 把一段字符串变成json返回
 * @param express 非严格json字符串
 * @returns 返回一个JSON对象
 */
export interface strToJsonType {
    (express:string): object
}

export let strToJson: strToJsonType