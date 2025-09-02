export interface callbackType {
    (type: "send" | "send@error" | "open" | "error" | "timeout" | "end", params: {
        [key: string]: any
    }): void
}

export interface callbackFactoryType {
    (): callbackType
}

/**
 * XHR拦截
 */
export interface XHRInterceptType {
    (callbackFactory: callbackFactoryType): void
}

export let XHRIntercept: XHRInterceptType