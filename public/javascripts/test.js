require('../components/angular/angular.min');
var moment = require('../components/moment/moment');
var ngRoute = require('../components/angular-route/angular-route');
var BillListCtrl = require('./billlistctrl');

var billApp;

var app = 'myApp',

billApp = angular.module(app, [
    'ngRoute'
]);

/*billApp.config(function($routeProvider) {
    $routeProvider
        .when('new', {
            controller: BillListCtrl,
            templateUrl: '../templates/newbill.html'
        })
        .otherwise();
});*/

billApp.filter('momentFromNow', function() {
    var momentFilter = function(input) {
        console.log('input', input);
        var test = new moment(input).from(new Date);
        return test;
    }
    /*return function(scope, elem, attr) {
        console.log('scope', scope);
        console.log('elem', elem);
        console.log('attr', attr);
    }*/
    return momentFilter;
});

billApp.filter('momentCalendar', function() {
    return function(input) {
        return new moment(input).calendar();
    }
});

billApp.controller('BillListCtrl', ['$scope', '$http', '$rootScope', /*'Bills',*/ function($scope, $http, $rootScope/*, Bills*/) {

    //console.log('Bills', Bills);

    $http.get('/bills').success(function(data) {
        $scope.bills = data;
    });

    $scope.$watch('bills', function(oldData, newData, scope) { });

    $rootScope.$on('bill', function(evt, data) {
        $scope.bills.push(data);
    });
}]);


billApp.controller('NewBillCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $scope.formState = false;

    $scope.toggleForm = function() {
        $scope.formState = !$scope.formState;
    }

    $scope.SaveData = function() {
        $http.post('/bills', $scope.bill).success(function(data) {
            $rootScope.$emit('bill', data);
            $scope.formState = false;
        }).error(function(data) {
            console.log('error', data);
        });
    };
}]);

billApp.factory('Bills', ['$http', function($http) {
    $http.get('/bills').success(function(data) {
        return data;
    });
}]);

module.exports = app;