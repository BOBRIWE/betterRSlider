import $ from 'jquery';

class BetterRSliderView implements IBetterRSliderListener{
    private _model: IBetterRSlider;
    private _rootObject: JQuery;
    private _sliderLine: JQuery;

    constructor(model: IBetterRSlider, rootObject: JQuery) {
        this._model = model;
        this._rootObject = rootObject;

        const sliderContainer = $('<div></div>');
        this._sliderLine = $('<div></div>');
        this._sliderLine.appendTo(sliderContainer);
        this._sliderLine.addClass('better-rslider__line');
        sliderContainer.addClass('better-rslider__container');

        rootObject.append(sliderContainer);
    }


    onNotify(): void {
        this._sliderLine.css('width', this._model.options.max + '%')
    }
}

export default BetterRSliderView;