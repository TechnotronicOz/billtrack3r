var myAppMod = angular.module('myApp', []);

myAppMod.controller('BillListCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $http.get('/bills').success(function(data) {
        $scope.bills = data;
    });

    $scope.$watch('bills', function(oldData, newData, scope) { });

    $rootScope.$on('bill', function(evt, data) {
        $scope.bills.push(data);
    });
}]);


myAppMod.controller('NewBillCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $scope.formState = false;

    $scope.toggleForm = function() {
        console.log('toggleForm');
        $scope.formState = !$scope.formState;
    }

    $scope.SaveData = function() {
        console.log($scope);

        $http.post('/bills', $scope.bill).success(function(data) {
            $rootScope.$emit('bill', data);
            $scope.formState = false;
        }).error(function(data) {
            console.log('error', data);
        });
    };
}]);