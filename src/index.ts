import $ from 'jquery';

$.fn.betterRSlider = Object.assign<BetterRSliderFunction, BetterRSliderGlobalOptions>(
    function (this: JQuery, options: BetterRSliderOptions): JQuery {

        // Merge the global options with the options given as argument.
        options = $.extend({}, $.fn.betterRSlider.options, options);

        let extra = '';
        if (options.value) {
            extra += options.value;
        }

        $(this).html('Hello World!' + extra);

        return this;

    },
    {
        options: {
            value: null
        }
    }
);