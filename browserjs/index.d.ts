import { getStyleType } from "./getStyle"
import { setStyleType } from "./setStyle"
import { onReadyType } from "./onReady"

export default class Corejs {
    static getStyle: getStyleType
    static setStyle: setStyleType
    static onReady: onReadyType
}

export let getStyle: getStyleType
export let setStyle: setStyleType
export let onReady: onReadyType