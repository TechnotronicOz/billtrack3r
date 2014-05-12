'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },

        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },

        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },

        handlebars: {
            exports: 'Handlebars'
        }
    },

    paths: {
        jquery: '../components/jquery/dist/jquery',
        backbone: '../components/backbone/backbone',
        underscore: '../components/underscore/underscore',
        bootstrap: '../components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap',
        hbs: '../components/require-handlebars-plugin/hbs',
        handlebars: '../components/handlebars/handlebars.amd'
    }
});