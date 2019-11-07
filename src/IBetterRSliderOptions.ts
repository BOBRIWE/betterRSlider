export default interface IBetterRSliderOptions {
    step?: number;
    vertical?: number;
    orientation?: string;
    min?: number;
    max?: number;
    value?: number;
    callback?: () => void;
}