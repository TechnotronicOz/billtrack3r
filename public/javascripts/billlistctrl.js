require('../components/angular/angular');
var newBill = angular.module('newBill', []);

var moduleName = 'newBill';

angular.module(moduleName, ['mgcrea.ngStrap'])
    .controller('NewBillCtrl', ['$scope', '$http', '$rootScope', '$modal', function($scope, $http, $rootScope, $modal) {
        console.log('the innards');

        $scope.formState = false;

        $scope.toggleForm = function() {
            $scope.formState = !$scope.formState;
        }

        $scope.toggleModal = function() {
            var theModal = $modal({
                scope: $scope,
                template: '/templates/newbill.html'
            });
            theModal.$promise.then(theModal.show);
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

module.exports = moduleName;