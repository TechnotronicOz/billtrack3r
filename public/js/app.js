'use strict';

angular.module('billApp', [
	'ngRoute',
	//'mgcrea.ngStrap',
	'billApp.filters',
	'billApp.services',
	'billApp.directives', 
	'billApp.controllers'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/list', { 
		templateUrl: '/partials/billlist.html',
		controller: 'BillListCtrl'
	});
	$routeProvider.when('/new', {
		templateUrl: '/partials/newbill.html',
		controller: 'NewBillCtrl'
	})
	$routeProvider.otherwise({ redirectTo: '/list' });
}]);