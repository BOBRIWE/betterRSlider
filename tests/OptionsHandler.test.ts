import OptionsHandler from '../src/OptionsHandler';
import IBetterRSliderOptions from '../src/IBetterRSliderOptions';

describe('OptionsHandler', function () {
    const options = {
        max: 10,
        min: 1,
        step: 2
    };
    const optionsHandler = new OptionsHandler();

    beforeEach(() => {
        optionsHandler.setOptions(options);
    });

    it('should check constraints', function () {
        expect(() => {
            optionsHandler.setOptions({max: 10, value: 100})
        }).toThrowError();

        expect(() => {
            optionsHandler.setOptions({min: 10, value: -1})
        }).toThrowError();

        expect(() => {
            optionsHandler.setOptions({step: -1})
        }).toThrowError();

        expect(() => {
            optionsHandler.setOptions({value: -1, valueSecond: -2})
        }).toThrowError();
    });


});