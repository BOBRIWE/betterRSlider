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
    private _secondPoint: JQuery;
    private _rangeLine: JQuery;
    private _rendered: () => void;
    private _mainPointCaption: JQuery;
    private _secondPointCaption: JQuery;

    constructor(model: IBetterRSlider, rootObject: JQuery) {
        this._model = model;
        this._rootObject = rootObject;
        this._rendered = (): void => {};
    }

    get mainPoint(): JQuery {
        return this._pointLeft;
    }

    get secondPoint(): JQuery {
        return this._secondPoint;
    }

    get sliderLine(): JQuery {
        return this._sliderLine;
    }

    render(): void {
        this._renderBody();
        this._render();
    }

    onRendered(callback: () => void): void {
        this._rendered = callback;
    }


    private _renderBody(): void {
        requestAnimationFrame(() => {
            this._sliderContainer = $('<div></div>');
            this._sliderLine = $('<div></div>');
            this._pointLeft = $('<div></div>');
            this._secondPoint = $('<div></div>');
            this._rangeLine = $('<div></div>');

            this._mainPointCaption = $(this._model.options.mainPointCaption as JQuery);
            this._secondPointCaption = $(this._model.options.secondPointCaption as JQuery);

            this._sliderLine.addClass('better-rslider__line');
            this._sliderContainer.addClass('better-rslider__container');
            this._pointLeft.addClass('better-rslider__point-main');
            this._secondPoint.addClass('better-rslider__point-second');
            this._rangeLine.addClass('better-rslider__range-line');

            this._pointLeft.appendTo(this._sliderLine);
            this._rangeLine.appendTo(this._sliderLine);
            this._sliderLine.appendTo(this._sliderContainer);
            this._rootObject.append(this._sliderContainer);

            this._mainPointCaption.appendTo(this._pointLeft);
            this._secondPoint.appendTo(this._secondPoint);

            this._rendered();
        });
    }

    private _render(): void {
        requestAnimationFrame(() => {

            if (this._model.options.orientation === 'vertical') {
                this._renderVertical();
            } else {
                this._renderHorizontal();
            }

            if (this._model.options.range) {
                this._secondPoint.appendTo(this._sliderLine);
            }else {
                this._secondPoint.detach();
            }

        });
    }

    private _renderVertical(): void {
        const offsetMain = ConvertationHelper.toPercents(
            this._model.options.min,
            this._model.options.max,
            this._model.options.value
        );

        const offsetSecond = ConvertationHelper.toPercents(
            this._model.options.min,
            this._model.options.max,
            this._model.options.valueSecond
        );

        const height = this._model.options.range ? offsetSecond-offsetMain : offsetMain;

        this._rangeLine.css('left', '');
        if (this._model.options.range) {
            this._rangeLine.css('bottom', offsetMain + '%');
        }else {
            this._rangeLine.css('bottom', '');
        }

        this._rangeLine.css('height', height + '%');
        this._rangeLine.css('width', '');
        this._pointLeft.css('bottom',offsetMain + '%');
        this._pointLeft.css('left','');
        this._secondPoint.css('bottom', offsetSecond + '%');
        this._secondPoint.css('left', '');
        this._setVertical();
    }

    private _renderHorizontal(): void {
        const offsetMain = ConvertationHelper.toPercents(
            this._model.options.min,
            this._model.options.max,
            this._model.options.value
        );

        const offsetSecond = ConvertationHelper.toPercents(
            this._model.options.min,
            this._model.options.max,
            this._model.options.valueSecond
        );

        const width = this._model.options.range ? offsetSecond-offsetMain : offsetMain;

        this._rangeLine.css('bottom', '');
        if (this._model.options.range) {
            this._rangeLine.css('left', offsetMain + '%');
        }else {
            this._rangeLine.css('left', '');
        }

        this._rangeLine.css('width',  width + '%');
        this._rangeLine.css('height',  '');
        this._pointLeft.css('left',offsetMain + '%');
        this._pointLeft.css('bottom','');
        this._secondPoint.css('left',offsetSecond + '%');
        this._secondPoint.css('bottom','');
        this._setHorizontal();
    }

    private _setVertical(): void {
        this._sliderLine.addClass('better-rslider__line--vertical');
        this._sliderContainer.addClass('better-rslider__container--vertical');
        this._pointLeft.addClass('better-rslider__point--vertical');
        this._secondPoint.addClass('better-rslider__point--vertical');
        this._rangeLine.addClass('better-rslider__range-line--vertical');
    }

    private _setHorizontal(): void {
        this._sliderLine.removeClass('better-rslider__line--vertical');
        this._sliderContainer.removeClass('better-rslider__container--vertical');
        this._pointLeft.removeClass('better-rslider__point--vertical');
        this._secondPoint.removeClass('better-rslider__point--vertical');
        this._rangeLine.removeClass('better-rslider__range-line--vertical');
    }

    onNotify(): void {
        this._render();
    }
}

export default BetterRSliderView;