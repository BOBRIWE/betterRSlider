import IBetterRSliderGlobalOptions from './IBetterRSliderGlobalOptions';
import IBetterRSliderOptions from './IBetterRSliderOptions';
import IBetterRSliderListener from './IBetterRSliderListener';

export default interface IBetterRSlider extends IBetterRSliderGlobalOptions {
    setOptions(options: IBetterRSliderOptions): void;
    handleStep(newValue: number, isSecond: boolean): void;
    addListener(listener: IBetterRSliderListener): void;
    notify(): void;
}