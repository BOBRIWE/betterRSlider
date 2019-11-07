import BetterRSlider from '../src/BetterRSlider';
import IBetterRSlider from '../src/IBetterRSlider';
import IBetterRSliderOptions from '../src/IBetterRSliderOptions';
import IBetterRSliderListener from '../src/IBetterRSliderListener';


describe('BetterRSlider', function() {
    let options: IBetterRSliderOptions;
    let betterRSlider: IBetterRSlider ;

    beforeEach(() => {
        options = {
            max: 101,
            min: 11,
            step: 2
        };

        betterRSlider = new BetterRSlider(options);
    });

    it('should return new options', function () {
        expect(options).not.toBe(betterRSlider.options);
    });

    it('should notify listener', function () {
        const listenerMock = {
            onNotify: jest.fn()
        };

        betterRSlider.addListener(listenerMock);
        betterRSlider.notify();

        expect(listenerMock.onNotify).toBeCalledTimes(1);
    });

    it('should set options', function () {
        const newOpts = {
            max: 10,
            min: 1,
            step: 2
        };
        betterRSlider.setOptions(newOpts);
        expect(newOpts).toEqual(betterRSlider.options);
    });

    it('should notify on options set', function () {
        const listenerMock = {
            onNotify: jest.fn()
        };

        betterRSlider.addListener(listenerMock);
        betterRSlider.setOptions({});

        expect(listenerMock.onNotify).toBeCalledTimes(1);
    });

    it('should notify on value set', function () {
        const listenerMock = {
            onNotify: jest.fn()
        };

        betterRSlider.addListener(listenerMock);
        betterRSlider.handleStep(0, false);

        expect(listenerMock.onNotify).toBeCalledTimes(1);
    });
});