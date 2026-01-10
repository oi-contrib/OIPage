
interface DevServerType {

    /**
     * 是否自动打开浏览器，默认false，true表示打开
     * 
     * 也可以是一段地址，比如设置open=“docs/index.html”
     */
    open?: boolean | string

    /**
     * 服务器端口号
     */
    port: number

    /**
     * 服务器根路径
     */
    baseUrl: string

    /**
     * 是否开启304缓存，默认开启
     */
    cache: boolean

    intercept?: Array<InterceptType>

    proxy?: {
        [key: string]: {
            target: string
            pathRewrite?: {
                [key: string]: string
            }
        }
    }
}

interface InterceptType {
    test: RegExp
    handler(request: any, response: any): void
}

interface LoaderType {
    (source: string): string
}

interface ConfigType {

    /**
     * 服务器名称
     */
    name?: string

    /**
     * 服务器版本
     */
    version?: string

    /**
     * 服务器运行配置
     */
    devServer: DevServerType

    module?: {
        rules: Array<{
            test: RegExp
            use: LoaderType
        }>
    }
}

export default function (config?: ConfigType): void