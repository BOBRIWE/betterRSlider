import $ from 'jquery';
import IBetterRSlider from './IBetterRSlider';
import BetterRSliderView from './BetterRSliderView';

export default class BetterRSliderController {
    private _model: IBetterRSlider;
    private _view: BetterRSliderView;
    private _startCoord: number;
    private _self: BetterRSliderController;
    private _curVal: number;
    private _isVertical: boolean;
    private _isSecond: boolean;

    constructor(model: IBetterRSlider, view: BetterRSliderView) {
        this._model = model;
        this._view = view;
        this._isSecond = false;
        this._self = this;
    }

    private _mouseDownHandler(e: JQuery.Event): void {
        e.preventDefault();
        this._isVertical = this._model.options.orientation === 'vertical';

        this._startCoord = this._isVertical ? e.clientY : e.clientX;

        this._curVal = this._isSecond ? this._model.options.valueSecond : this._model.options.value;
        const moveHandler = this._isVertical ? this._mouseMoveVerticalHandler : this._mouseMoveHandler;
        $(document).on('mousemove', moveHandler.bind(this._self));
        $(document).on('mouseup', this._mouseUpHandler);
    }

    private _mouseMoveHandler(e: JQuery.Event): void {
        const width = this._view.sliderLine.innerWidth();
        const val = (this._model.options.max - this._model.options.min) / width;
        this._model.handleStep(this._curVal + (e.clientX - this._startCoord) * val, this._isSecond);
    }

    private _mouseMoveVerticalHandler(e: JQuery.Event): void {
        const height = this._view.sliderLine.innerHeight();
        const val = ( (this._model.options.max - this._model.options.min) / height);
        this._model.handleStep(-(-this._curVal + (e.clientY - this._startCoord) * val), this._isSecond);
    }

    private _mouseUpHandler(): void {
        const moveHandler = this._isVertical ? this._mouseMoveVerticalHandler : this._mouseMoveHandler;
        $(document).off('mouseup', this._mouseUpHandler);
        $(document).off('mousemove', moveHandler);
    }

    bind(): void {
        this._view.leftPoint.on('mousedown', (e: JQuery.Event) => {
            this._isSecond = false;
            this._mouseDownHandler.call(this._self, e);
        });
        if (this._model.options.range) {
            this._view.secondPoint.on('mousedown', (e: JQuery.Event) => {
                this._isSecond = true;
                this._mouseDownHandler.call(this._self, e);
            });
        }
    }
}