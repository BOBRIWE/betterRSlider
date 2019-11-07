export default interface IBetterRSliderOptions {
    step?: number;
    vertical?: number;
    orientation?: string;
    range?: boolean;
    min?: number;
    max?: number;
    value?: number;
    valueSecond?: number;
    mainPointCaption?: string | JQuery;
    secondPointCaption?: string | JQuery;
    callback?: () => void;
}