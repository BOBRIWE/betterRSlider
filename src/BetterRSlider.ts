import $ from 'jquery';
import IBetterRSlider from './IBetterRSlider';
import IBetterRSliderOptions from './IBetterRSliderOptions';
import IBetterRSliderListener from './IBetterRSliderListener';
import OptionsHandler from './OptionsHandler';

class BetterRSlider implements IBetterRSlider{
    private _options: IBetterRSliderOptions;
    private _listeners: IBetterRSliderListener[];

    constructor(options: IBetterRSliderOptions) {
        this._listeners = [];
        this._options = options;
    }

    get options(): IBetterRSliderOptions {
        return Object.assign({}, this._options);
    }

    setOptions(options: IBetterRSliderOptions): void {
        const exOptions = $.extend({}, this._options, options);
        const optHandler = new OptionsHandler(exOptions);
        this.notify();
    }

    addListener(listener: IBetterRSliderListener): void {
        this._listeners.forEach((item) => {
            if (item === listener) {
                throw new Error('Observer already in the list')
            }
        });

        this._listeners.push(listener);
    }

    notify(): void {
        this._listeners.forEach((listener) => {
            listener.onNotify();
        });

        if (this._options.callback) {
            this._options.callback();
        }
    }

}

export default BetterRSlider;