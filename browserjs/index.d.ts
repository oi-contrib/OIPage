import { getStyleType } from "./getStyle"
import { onReadyType } from "./onReady"

export default class Corejs {
    static getStyle: getStyleType
    static onReady: onReadyType
}

export let getStyle: getStyleType
export let onReady: onReadyType