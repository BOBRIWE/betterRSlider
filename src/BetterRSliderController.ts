import $ from 'jquery';
import IBetterRSlider from './IBetterRSlider';
import BetterRSliderView from './BetterRSliderView';

export default class BetterRSliderController {
    private _model: IBetterRSlider;
    private _view: BetterRSliderView;
    private _startX: number;
    private _self: BetterRSliderController;
    private _curVal: number;

    constructor(model: IBetterRSlider, view: BetterRSliderView) {
        this._model = model;
        this._view = view;
        this._self = this;
    }

    private _mouseDownHandler(e: JQuery.Event): void {
        e.preventDefault();
        this._startX = e.clientX;
        this._curVal = this._model.options.value;
        $(document).on('mousemove', this._mouseMoveHandler.bind(this._self));
        $(document).on('mouseup', this._mouseUpHandler);
    }

    private _mouseMoveHandler(e: JQuery.Event): void {
        const width = this._view.sliderLine.innerWidth();
        const val = ( (this._model.options.max - this._model.options.min) / width);
        this._model.setOptions({value: this._curVal + (e.clientX - this._startX) * val});
    }

    private _mouseUpHandler(): void {
        $(document).off('mouseup', this._mouseUpHandler);
        $(document).off('mousemove', this._mouseMoveHandler);
    }

    bind(): void {
        this._view.leftPoint.on('mousedown', this._mouseDownHandler.bind(this._self));
    }
}