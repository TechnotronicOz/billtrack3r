define([], function () {
    'use strict';

    var BillListController = function($scope, $http, $rootScope, Bills) {
        $http.get('/bills').success(function(data) {
            $scope.bills = data;
        });

        $scope.$watch('bills', function(oldData, newData, scope) {});

        $rootScope.$on('bill', function(evt, data) {
            $scope.bills.push(data);
        });
    }

    return ["$scope", "$http", "$rootScope", "Bills", BillListController];
});