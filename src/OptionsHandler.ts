import IBetterRSliderOptions from './IBetterRSliderOptions';
import $ from 'jquery';

export default class OptionsHandler {
    private _options: IBetterRSliderOptions;
    private _possibles: number[];
    private _possiblesSecond: number[];


    handleStep(newValue: number, isSecond: boolean): IBetterRSliderOptions {
        const options = this._options;
        const possibles = isSecond? this._possiblesSecond : this._possibles;

        if (this._options.range) {
            this._possibles = this._getPossibleValuesArray(options.min, options.valueSecond, options.step, options.value);
            this._possiblesSecond = this._getPossibleValuesArray(options.value, options.max, options.step, options.valueSecond);
        }

        const roundedVal = parseFloat(newValue.toFixed(2));
        if (possibles.includes(roundedVal)) {
            if (isSecond) {
                options.valueSecond = roundedVal;
            } else {
                options.value = roundedVal;
            }
            return Object.assign({}, options);
        }

        return options;
    }

    private _getPossibleValuesArray(min: number, max: number, step: number, currentVal: number): number[] {
        const arr = [];
        let current = currentVal;
        while (current <= max) {
            arr.push(parseFloat(current.toFixed(2)));
            current+=step;
        }

        current = currentVal-step;
        while (current >= min) {
            arr.push(parseFloat(current.toFixed(2)));
            current-=step;
        }

        return arr;
    }

    private _checkConstraints(options: IBetterRSliderOptions): void {
        if (options.value > options.max || options.valueSecond > options.max) {
            throw new Error('Value should be <= max');
        } else if (options.value < options.min || options.valueSecond < options.min) {
            throw new Error('Value should be >= min')
        } else if (options.step <= 0) {
            throw new Error('Step should be > 0');
        } else if (options.value > options.valueSecond) {
            throw new Error('Second value should be >= first value');
        }
    }

    setOptions(options: IBetterRSliderOptions): void {
        if (!options.range) {
            options.valueSecond = options.max;
        }

        const exOptions = $.extend({}, this._options, options);
        this._checkConstraints(exOptions);
        this._options = exOptions;

        if (exOptions.range) {
            this._possibles = this._getPossibleValuesArray(exOptions.min, exOptions.valueSecond, exOptions.step, exOptions.value);
            this._possiblesSecond = this._getPossibleValuesArray(exOptions.value, exOptions.max, exOptions.step, exOptions.valueSecond);
        } else {
            this._possibles = this._getPossibleValuesArray(exOptions.min, exOptions.max, exOptions.step, exOptions.value);
        }
    }

    get options(): IBetterRSliderOptions {
        return Object.assign({}, this._options);
    }
}