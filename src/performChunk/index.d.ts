export interface performChunkType {
    (chunkFun: () => boolean): void
}

export let reader: performChunkType