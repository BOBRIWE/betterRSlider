import $ from 'jquery';
import IBetterRSliderListener from './IBetterRSliderListener';
import IBetterRSlider from './IBetterRSlider';
import ConvertationHelper from './ConvertationHelper';

class BetterRSliderView implements IBetterRSliderListener{
    private _model: IBetterRSlider;
    private _rootObject: JQuery;
    private _sliderLine: JQuery;
    private _sliderContainer: JQuery;
    private _pointLeft: JQuery;
    private _pointRight: JQuery;
    private _rangeLine: JQuery;
    private _callback: () => void;

    constructor(model: IBetterRSlider, rootObject: JQuery) {
        this._model = model;
        this._rootObject = rootObject;
        this._callback = (): void => {};

        this._renderBody();
        this._render();
    }

    get leftPoint(): JQuery {
        return this._pointLeft;
    }

    get sliderLine(): JQuery {
        return this._sliderLine;
    }

    onRendered(callback: () => void): void {
        this._callback = callback;
    }


    private _renderBody(): void {
        requestAnimationFrame(() => {
            this._sliderContainer = $('<div></div>');
            this._sliderLine = $('<div></div>');
            this._pointLeft = $('<div></div>');
            this._rangeLine = $('<div></div>');

            this._sliderLine.addClass('better-rslider__line');
            this._sliderContainer.addClass('better-rslider__container');
            this._pointLeft.addClass('better-rslider__point-main');
            this._rangeLine.addClass('better-rslider__range-line');

            this._pointLeft.appendTo(this._sliderLine);
            this._rangeLine.appendTo(this._sliderLine);
            this._sliderLine.appendTo(this._sliderContainer);
            this._rootObject.append(this._sliderContainer);

            this._callback();
        });
    }

    private _render(): void {
        requestAnimationFrame(() => {
            const offset = ConvertationHelper.toPercents(
                this._model.options.min,
                this._model.options.max,
                this._model.options.value
            ) + '%';

            if (this._model.options.orientation === 'vertical') {
                this._rangeLine.css('height', offset);
                this._pointLeft.css('bottom',offset);
                this._setVertical();
            } else {
                this._rangeLine.css('width', offset);
                this._pointLeft.css('left',offset);
                this._setHorizontal();
            }
        });
    }

    private _setVertical(): void {
        this._sliderLine.addClass('better-rslider__line--vertical');
        this._pointLeft.addClass('better-rslider__point--vertical');
        this._rangeLine.addClass('better-rslider__range-line--vertical');
    }

    private _setHorizontal(): void {
        this._sliderLine.removeClass('better-rslider__line--vertical');
        this._pointLeft.removeClass('better-rslider__point--vertical');
        this._rangeLine.removeClass('better-rslider__range-line--vertical');
    }

    onNotify(): void {
        this._render();
    }
}

export default BetterRSliderView;