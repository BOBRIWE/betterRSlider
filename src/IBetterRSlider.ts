import IBetterRSliderGlobalOptions from './IBetterRSliderGlobalOptions';
import IBetterRSliderOptions from './IBetterRSliderOptions';
import IBetterRSliderListener from './IBetterRSliderListener';

export default interface IBetterRSlider extends IBetterRSliderGlobalOptions {
    setOptions(options: IBetterRSliderOptions): void;

    addListener(listener: IBetterRSliderListener): void;

    notify(): void;
}