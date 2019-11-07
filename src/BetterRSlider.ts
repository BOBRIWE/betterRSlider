import IBetterRSlider from './IBetterRSlider';
import IBetterRSliderOptions from './IBetterRSliderOptions';
import IBetterRSliderListener from './IBetterRSliderListener';
import OptionsHandler from './OptionsHandler';

class BetterRSlider implements IBetterRSlider {
    private _listeners: IBetterRSliderListener[];
    private _optionsHandler: OptionsHandler;

    constructor(options: IBetterRSliderOptions) {
        this._listeners = [];
        this._optionsHandler = new OptionsHandler();
        this._optionsHandler.setOptions(options);
    }

    get options(): IBetterRSliderOptions {
        return Object.assign({}, this._optionsHandler.options);
    }

    setOptions(options: IBetterRSliderOptions): void {
        this._optionsHandler.setOptions(options);
        this.notify();
    }

    handleStep(newValue: number): void {
        this._optionsHandler.handleStep(newValue);
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

        const options = this._optionsHandler.options;
        if (options.callback) {
            options.callback();
        }
    }
}

export default BetterRSlider;