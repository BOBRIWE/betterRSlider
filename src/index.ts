import $ from 'jquery';
import BetterRSliderView from './BetterRSliderView';
import BetterRSlider from './BetterRSlider';

const defaultOptions: IBetterRSliderOptions = {
    max: 100,
    min: 0,
    step: 1
};

$.fn.betterRSlider = function (this: JQuery, options: IBetterRSliderOptions): JQuery {

    if (this.data('model')) {
        const model: IBetterRSlider = this.data('model');
        model.setOptions(options);

        return this;
    }

    const model = new BetterRSlider($.extend({}, defaultOptions, options));

    const view = new BetterRSliderView(model, this);
    model.addListener(view);

    this.data('model', model);

    return this;
};