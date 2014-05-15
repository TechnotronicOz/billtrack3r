'use strict';

require.config({
    paths: {
        jquery: '../components/jquery/dist/jquery',
        bootstrap: '../components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap',
        hbs: '../components/require-handlebars-plugin/hbs',
        handlebars: '../components/handlebars/handlebars.amd',
        domReady: '../components/requirejs-domready/domReady',
        angular: '../components/angular/angular',
        ngAnimate: '../components/angular-animate/angular-animat;e',
        ngRoute: '../components/angular-route/angular-route',
        ngSanitize: '../components/angular-sanitize/angular-sanitize',
        ngStrap: '../components/angular-strap/dist/angular-strap',
        ngStrapTmpl: '../components/angular-strap/dist/angular-strap.tpl'

    },

    shim: {
        /*backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },*/

        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },

        handlebars: {
            exports: 'Handlebars'
        }
    }
});