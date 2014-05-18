var myAppMod = angular.module('myApp', []);

myAppMod.controller('BillListController', function($scope, $http, $rootScope) {
    $http.get('/bills').success(function(data) {
        console.log('data', data);
        $scope.bills = data;
    });

    $scope.$watch('bills', function(arg1, arg2) {
        console.log('watch', [arg1, arg2])
    });

    $rootScope.$on('bill', function(evt, data) {
        $scope.bills.push(data);
    })

    /* $scope.remove = function(index) {
        $scope.bills.splice(index, 1);
    } */
});

myAppMod.controller('NewBillCtrl', function($scope, $http, $rootScope) {
    $scope.formState = false;

    $scope.toggleForm = function() {
        console.log('toggleForm');
        $scope.formState = !$scope.formState;
    }

    $scope.SaveData = function() {
        console.log($scope);

        $http.post('/bills', $scope.bill).success(function(data) {
            $rootScope.$emit('bill', data)
            console.log('success', data);
        }).error(function(data) {
            console.log('error', data);
        });
    };
});