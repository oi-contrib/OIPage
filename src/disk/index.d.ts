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