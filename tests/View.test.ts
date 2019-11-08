/**
 * @jest-environment jsdom
 */
import BetterRSliderController from '../src/BetterRSliderController';
import $ from 'jquery';
import '../src/index';

describe('View', function () {
    it('should create point', function () {
        const element = document.createElement('div');
        const $element = $(element);
        $element.css('width', '700px');
        $element.css('height', '100px');
        $('body').append($element);

        $element.betterRSlider();

        const point = $element.find('better-rslider__point-main');
        expect(point).not.toBe(undefined);

    });
});