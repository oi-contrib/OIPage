interface resType {

    /**
     * 响应体
     */
    data: string

    /**
     * 响应头
     */
    headers: {
        [key: string]: any
    }
}

export interface getType {
    (url: string, headers?: {
        [key: string]: any
    }): Promise<resType>
}

export let get: getType

export interface postType {
    (url: string, headers?: {
        [key: string]: any
    }, params?: {
        [key: string]: any
    }): Promise<resType>
}

export let post: postType