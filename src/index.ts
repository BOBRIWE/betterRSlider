import $ from 'jquery';
import BetterRSliderView from './BetterRSliderView';
import BetterRSlider from './BetterRSlider';
import IBetterRSliderOptions from './IBetterRSliderOptions';
import IBetterRSlider from './IBetterRSlider';
import BetterRSliderController from './BetterRSliderController';

const defaultOptions: IBetterRSliderOptions = {
    max: 100,
    min: 0,
    value: 0,
    step: 1,
    orientation: 'horizontal'
};

$.fn.betterRSlider = function (this: JQuery, options: IBetterRSliderOptions | string): JQuery | number | string | boolean {

    if (this.data('model')) {
        const model: IBetterRSlider = this.data('model');
        if (options === 'value') {
            return model.options.value;
        }

        model.setOptions(options as IBetterRSliderOptions);
        return this;
    }

    const model = new BetterRSlider($.extend({}, defaultOptions, options));
    const view = new BetterRSliderView(model, this);
    const controller = new BetterRSliderController(model, view);

    view.onRendered(() => {
        controller.bind();
    });

    model.addListener(view);
    this.data('model', model);

    return this;
};