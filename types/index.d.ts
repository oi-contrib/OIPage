import getOptionsType from './get-options'

export default class OIPage {

    /**
     * 命令行参数解析
     * @param shortHands 
     * @param argv 
     */
    static options(shortHands: any, argv: any): any

    /**
     * 删除文件或文件夹
     * @param target 
     */
    static deleteSync(target: string): void

    /**
     * 复制文件或文件夹
     * @param source 
     * @param target 
     */
    static copySync(source: string, target: string): void

    /**
     * 移动文件或文件夹
     * @param source 
     * @param target 
     */
    static moveSync(source: string, target: string): void

    /**
     * 遍历当前文件或文件夹中所有文件
     * @param source 
     * @param callback 
     */
    static listFileSync(source: string, callback: (fileInfo: {
        name: string,
        path: string,
        folder: string
    }) => void): void

    /**
     * 获取文件或文件夹的全路径
     * @param pathString 需要变成全路径的路径
     * @param contextPath 拼接上下文路径，可选，默认当前命令行路径
     * @returns {path} 返回拼接的全路径
     */
    static fullPathSync(pathString: string, contextPath?: string): string

    /**
     * 图片变成base64字符串
     * @param filepath 图片地址
     */
    static toBase64(filepath: string): string

    /**
     * 日志打印
     * @param txt 
     */
    static log(txt: string): void

    /**
     * 提醒打印
     * @param txt 
     */
    static warn(txt: string): void

    /**
     * 警告打印
     * @param txt 
     */
    static error(txt: string): void

    /**
     * 单行打印
     * @param txt 
     */
    static linelog(txt: string): void

    /**
     * 进度打印
     * @param percentum 
     * @param txt 
     */
    static deeplog(percentum: number, txt?: string): void

    /**
     * 进度打印（已废弃，请用deeplog代替）
     * @param percentum 
     * @param txt 
     */
    static process(percentum: number, txt?: string): void

    /**
     * Get 请求
     * @param url 
     * @param options 
     */
    static get(url: string, options?: getOptionsType): Promise<any>

    /**
     * Post 请求
     * @param url 
     * @param options 
     */
    static post(url: string, options?: getOptionsType): Promise<any>

    /**
     * 获取本机网络信息
     */
    static network(): any

    /**
     * 文件类型
     */
    static mimeTypes(): { [name: string]: string }

    /**
     * 服务器
     */
    static server(config: {

        /**
         * 端口号
         * 
         * 默认值：20000
         */
        port?: number

        /**
         * 服务器根地址
         * 
         * 默认值：./
         */
        basePath?:string

        /**
         * 配置转发，可以任意多个
         */
        proxy?: Array<any>

        /**
         * 自定义拦截，如果返回true表示此次请求自定义处理
         */
        handler?: (request, response) => boolean

        /**
         * 表示缺省后缀
         * 
         * 默认值：[".html",".htm",".js",".json"]
         */
        suffixs?: Array<string>
    }): void

    /**
     * scss文件转css（只支持部分scss语法）
     * @param source 
     */
    static simpleScss(source: string): string

    /**
     * xhtml文件解析成json对象
     * @param source 
     */
    static xhtml(source: string): Array<{
        type: string,
        name: string,
        attrs: {
            [key: string]: string
        },
        __deep__: number,
        __tagType__: string,
        childNodes: Array<number>,
        preNode: null | number,
        nextNode: null | number,
        parentNode: null | number
    } | {
        type: string,
        content: string,
        __deep__: number,
        childNodes: Array<number>,
        preNode: null | number,
        nextNode: null | number,
        parentNode: null | number
    }>
}