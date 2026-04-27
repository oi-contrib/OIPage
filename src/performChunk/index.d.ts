export interface performChunkType {
    (chunkFun: () => boolean): void
}

export let performChunk: performChunkType