import IBetterRSliderOptions from './IBetterRSliderOptions';
import $ from 'jquery';

export default class OptionsHandler {
    private _options: IBetterRSliderOptions;
    private _possibles: number[];


    handleStep(newValue: number): IBetterRSliderOptions {
        const options = this._options;

        const possibles = this._possibles;
        if (possibles.includes(newValue)) {
            options.value = newValue;
            return Object.assign({}, options);
        }

        return options;
    }

    private _getPossibleValuesArray(min: number, max: number, step: number, currentVal: number): number[] {
        const arr = [];
        let current = currentVal;
        while (current <= max) {
            current = Math.round(current * 100000) / 100000;
            arr.push(current);
            current+=step;
        }

        current = currentVal-step;
        while (current >= min) {
            current = Math.round(current * 100000) / 10000;
            arr.push(current);
            current-=step;
        }

        return arr;
    }

    private _checkConstraints(options: IBetterRSliderOptions): void {
        if (options.value > options.max) {
            throw new Error('Value should be <= max');
        } else if (options.value < options.min) {
            throw new Error('Value should be >= min')
        } else if (options.step <= 0) {
            throw new Error('Step should be > 0');
        }
    }

    setOptions(options: IBetterRSliderOptions): void {
        const exOptions = $.extend({}, this._options, options);
        this._checkConstraints(exOptions);
        this._options = exOptions;
        this._possibles = this._getPossibleValuesArray(exOptions.min, exOptions.max, exOptions.step, exOptions.value);
    }

    get options(): IBetterRSliderOptions {
        return Object.assign({}, this._options);
    }
}