interface IBetterRSlider extends IBetterRSliderGlobalOptions {
    setOptions(options: IBetterRSliderOptions): void;

    addListener(listener: IBetterRSliderListener): void;

    notify(): void;
}