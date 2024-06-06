declare global {
    namespace NodeJS {
        interface ProcessEnv {

            /**
             * OIPage 模式
             */
            OIPAGE_MODE: "development" | "production"

            /**
             * OIPage 平台
             */
            OIPAGE_PLATFORM: "h5" | "mp-weixin" | "mp-alipay" | "my-toutiao"

            /**
             * OIPage 项目根目录
             */
            OIPAGE_ROOT: string

            /**
             * OIPage 打包根目录
             */
            OIPAGE_DIST: string
        }
    }
}

export { }