require('../components/angular/angular.min');
require('../components/angular-route/angular-route');
require('../components/angular-strap/dist/angular-strap');
require('../components/angular-strap/dist/angular-strap.tpl');
var moment = require('../components/moment/moment');/*,
    BillListCtrl = require('./billlistctrl');*/

var app = 'myApp',
    billApp;

billApp = angular.module(app, [
    'ngRoute',
    'mgcrea.ngStrap'/* ,
    BillListCtrl */
]);

billApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/new', {
            controller: 'NewBillCtrl',
            templateUrl: '../templates/newbill.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    //$locationProvider.html5Mode(true);

});

billApp.filter('momentFromNow', function() {
    return function(input) {
        return new moment(input).from(new Date);
    }
});

billApp.filter('momentCalendar', function() {
    return function(input) {
        return new moment(input).calendar();
    }
});

billApp.controller('BillListCtrl', ['$scope', '$http', '$rootScope', 'Bills', 'UserService', function($scope, $http, $rootScope, Bills, UserService) {

    UserService.storeUser(window.user);

    $http.get('/bills').success(function(data) {
        $scope.bills = data;
    });

    $scope.$watch('bills', function(oldData, newData, scope) { });

    $rootScope.$on('bill', function(evt, data) {
        $scope.bills.push(data);
    });
}]);


billApp.controller('NewBillCtrl', ['$scope', '$http', '$rootScope', '$modal', 'UserService', function($scope, $http, $rootScope, $modal, UserService) {
    $scope.formState = false;

    $scope.toggleForm = function() {
        console.log('toggleForm');
        $scope.formState = !$scope.formState;
    }

    $scope.toggleModal = function() {
        var theModal = $modal({
            scope: $scope,
            template: '/templates/newbill.html'
        });
        theModal.$promise.then(theModal.show);
    }

    $scope.user = UserService.getUser();
    $scope.SaveData = function() {
        $scope.bill.user = $scope.user.email;
        $http.post('/bills', $scope.bill).success(function(data) {
            $rootScope.$emit('bill', data);
            $scope.formState = false;
        }).error(function(data) {
            console.log('error', data);
        });
    };
}]);

billApp.factory('UserService', function() {
    var storedUser;
    return {
        storeUser: function(user) {
            storedUser = user;
        },
        getUser: function() {
            return storedUser;
        }
    }
});

billApp.factory('Bills', ['$http', function($http) {
    $http.get('/bills').success(function(data) {
        return data;
    });
}]);

module.exports = app;