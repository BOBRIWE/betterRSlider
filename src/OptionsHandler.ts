import IBetterRSliderOptions from './IBetterRSliderOptions';

export default class OptionsHandler {
    private readonly _options: IBetterRSliderOptions;

    constructor(options: IBetterRSliderOptions) {
        this._options = options;
    }

    handle() {
        const options = this._options;

        if (options.value > options.max) {
            options.value = options.max;
        } else if (options.value < options.min) {
            options.value = options.min;
        }
    }
}