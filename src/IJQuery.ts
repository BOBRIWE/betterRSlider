import IBetterRSliderFunction from './IBetterRSliderFunction';

declare global {
    // eslint-disable-next-line @typescript-eslint/interface-name-prefix
    interface JQuery {
        betterRSlider: IBetterRSliderFunction;
    }
}