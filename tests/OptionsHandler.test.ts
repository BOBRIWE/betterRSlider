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
        optionsHandler.setOptions({max: 10, value: 100});
        expect(optionsHandler.options).toEqual(options);

        optionsHandler.setOptions({min: 10, value: -1});
        expect(optionsHandler.options).toEqual(options);

        optionsHandler.setOptions({step: -1});
        expect(optionsHandler.options).toEqual(options);

        optionsHandler.setOptions({value: -1, valueSecond: -2});
        expect(optionsHandler.options).toEqual(options);
    });


});