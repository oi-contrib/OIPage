/**
 * 删除文件或文件夹
 */
export interface deleteDiskType {
    (diskPath: string): void
}

export let deleteDisk: deleteDiskType

/**
 * 复制文件或文件夹
 */
export interface copyDiskType {
    (sourcePath: string, targetPath: string, isForce?: boolean): void
}

export let copyDisk: copyDiskType

/**
 * 移动文件或文件夹
 */
export interface moveDiskType {
    (sourcePath: string, targetPath: string, isForce?: boolean): void
}

export let moveDisk: moveDiskType

/**
 * 遍历当前文件或文件夹中所有文件
 */
export interface listDiskType {
    (sourcePath: string, callback: (fileInfo: {
        name: string
        path: string
        folder: string
    }) => void): void
}

export let listDisk: listDiskType

/**
 * 创建文件或文件夹的链接
 */
export interface linkDiskType {
    (sourcePath: string, targetPath: string): void
}

export let linkDisk: linkDiskType