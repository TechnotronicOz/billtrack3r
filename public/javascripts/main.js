define([
    'require',
    'angular',
    'test'
], function(require, angular, test) {
    require(['domReady!'], function(document) {
        angular.bootstrap(document, [test]);
    });
});