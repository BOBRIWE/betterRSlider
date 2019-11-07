export default interface IBetterRSliderOptions {
    step?: number;
    rotate?: number;
    range?: boolean;
    min?: number;
    max?: number;
    value?: number;
    callback?: () => void;
}