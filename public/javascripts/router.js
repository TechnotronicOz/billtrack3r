define(function(require, exports, module) {
    'use strict';

    // External dependencies.
    var Backbone = require('backbone');
    var App = require('app');
    var Header = require('hbs!templates/header');
    var bootstrap = require('bootstrap');

    module.exports = Backbone.Router.extend({
        routes: {
            '': 'home',
            'weather': 'weather',
            'weather/:location': 'weather',
            'mylocation': 'mylocation',
            'mylocation/edit/:location': 'editLocation',
            'mylocation/add': 'addLocation'
        },

        initialize: function() {
            console.log('router initialize');
            this.$appContainer = $('#app');
            this.$headerContainer = $('#header');
            this.$headerContainer.html(Header());
            
            //var LocationModel = require('models/location');
            //var LocationCollection = require('collections/locations');
            //this.locationCollection = new LocationCollection();
            //this.locationModel = new LocationModel();
            //this.loadHeader();
            //this.home();
        },

        setView: function(view) {
            if (this.view) {
                this.view.remove();
                this.view = null;
            }
            if (view === null) {
                return;
            }
            this.view = view;
            return this.$appContainer.html(this.view.render().el);
        }
    });
});