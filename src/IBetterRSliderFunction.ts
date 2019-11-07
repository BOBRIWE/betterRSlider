import IBetterRSliderOptions from './IBetterRSliderOptions';

export default interface IBetterRSliderFunction {
    (options: IBetterRSliderOptions): JQuery | number | string | boolean;
}