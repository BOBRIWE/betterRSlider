/**
 * @jest-environment jsdom
 */
import BetterRSliderController from '../src/BetterRSliderController';
import $ from 'jquery';
import '../src/index';

beforeEach(() => {
    window.requestAnimationFrame = (callback: FrameRequestCallback): number => {
        callback(0);
        return 0;
    };
});

describe('View', function () {
    it('should create point', function () {
        const element = document.createElement('div');
        const $element = $(element);
        $element.css('width', '700px');
        $element.css('height', '100px');
        $('body').append($element);

        $element.betterRSlider();

        const point = $($element.find('.better-rslider__point-main')[0]);
        expect(point).not.toBe(undefined);
    });

    it('should remove style of previous orientation', function () {
        const element = document.createElement('div');
        const $element = $(element);
        $element.css('width', '700px');
        $element.css('height', '100px');
        $('body').append($element);

        $element.betterRSlider({
            orientation: 'horizontal',
            value: 20
        });

        const line = $($element.find('.better-rslider__range-line')[0]);
        const point = $($element.find('.better-rslider__point-main')[0]);
        let pointStyle = point.attr('style');
        let lineStyle = line.attr('style');
        expect(pointStyle).not.toContain('bottom');
        expect(lineStyle).not.toContain('bottom');
        expect(lineStyle).not.toContain('height');

        $element.betterRSlider({
            orientation: 'vertical'
        });

        pointStyle = point.attr('style');
        lineStyle = line.attr('style');
        expect(pointStyle).not.toContain('left');
        expect(lineStyle).not.toContain('left');
        expect(lineStyle).not.toContain('width');
    });

    it('should remove second point on range false', function () {
        const element = document.createElement('div');
        const $element = $(element);
        $element.css('width', '700px');
        $element.css('height', '100px');
        $('body').append($element);

        $element.betterRSlider({
            orientation: 'horizontal',
            value: 20,
            range: true
        });

        $element.betterRSlider({
            range: false
        });

        const point = $element.find('.better-rslider__point-second')[0];
        expect(point).toBe(undefined);
    });
});