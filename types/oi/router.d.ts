declare global {
    namespace OIPageNamespace {
        interface OIPageInterface {

            /**
            * 保留当前页面，跳转到应用内的某个页面
            */
            navigateTo(option: {
                url: string
            }): Promise<null>

            /**
             * 关闭当前页面，跳转到应用内的某个页面
             */
            redirectTo(option: {
                url: string
            }): Promise<null>

            /**
             * 关闭所有页面，打开到应用内的某个页面
             */
            reLaunch(option: {
                url: string
            }): Promise<null>

            /**
             * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
             */
            switchTab(option: {
                url: string
            }): Promise<null>

            /**
             * 关闭当前页面，返回上一页面或多级页面
             */
            navigateBack(option: {
                delta?: number
            }): Promise<null>

        }
    }
}

export { }