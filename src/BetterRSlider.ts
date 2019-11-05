import $ from 'jquery';

class BetterRSlider implements IBetterRSlider{
    private _options: IBetterRSliderOptions;
    private _listeners: IBetterRSliderListener[];

    constructor(options: IBetterRSliderOptions) {
        this._listeners = [];
        this.setOptions(options);
    }

    get options(): IBetterRSliderOptions {
        return Object.assign({}, this._options);
    }


    setOptions(options: IBetterRSliderOptions): void {
        this._options = $.extend({}, this._options, options);
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
    }

}

export default BetterRSlider;