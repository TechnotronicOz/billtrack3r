define([
    'angular'
], function(angular) {
    var app = 'myApp',

    app = angular.module(app, [
        'ngRoute',
        'BillListCtrl'
    ]);

    app.config(function($routeProvider) {
        $routeProvider
            .when('new', {
                controller: BillListCtrl,
                templateUrl: '../templates/newbill.html'
            })
            .otherwise();
    });

    app.controller('BillListCtrl', ['$scope', '$http', '$rootScope', 'Bills', function($scope, $http, $rootScope, Bills) {

        console.log('Bills', Bills);

        $http.get('/bills').success(function(data) {
            $scope.bills = data;
        });

        $scope.$watch('bills', function(oldData, newData, scope) { });

        $rootScope.$on('bill', function(evt, data) {
            $scope.bills.push(data);
        });
    }]);


    app.controller('NewBillCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
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

    app.factory('Bills', ['$http', function($http) {
        $http.get('/bills').success(function(data) {
            return data;
        });
    }]);

    return app;

});