import $ from 'jquery';
import BetterRSliderView from './BetterRSliderView';
import BetterRSlider from './BetterRSlider';
import IBetterRSliderOptions from './IBetterRSliderOptions';
import IBetterRSlider from './IBetterRSlider';
import './IJQuery';
import BetterRSliderController from './BetterRSliderController';

const defaultOptions: IBetterRSliderOptions = {
    max: 100,
    min: 0,
    value: 0,
    valueSecond: 100,
    step: 1,
    orientation: 'horizontal',
    mainPointCaption: '<div></div>',
    secondPointCaption: '<div></div>'
};

$.fn.betterRSlider = function (this: JQuery, options: IBetterRSliderOptions | string = {}): JQuery | IBetterRSliderOptions {

    if (this.data('model')) {
        const model: IBetterRSlider = this.data('model');
        if (options === 'options') {
            return model.options;
        }

        model.setOptions(options as IBetterRSliderOptions);
        return this;
    }

    const model = new BetterRSlider($.extend({}, defaultOptions, options));
    const view = new BetterRSliderView(model, this);
    const controller = new BetterRSliderController(model, view);

    view.onRendered(() => {
        controller.bind();
        model.notify();
    });

    model.addListener(view);
    this.data('model', model);

    return this;
};