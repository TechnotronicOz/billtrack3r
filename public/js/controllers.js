'use strict';

/* Controllers */

angular.module('billApp.controllers', [])
	.controller('BillListCtrl', ['$scope', '$http', '$rootScope', 'UserService', function($scope, $http, $rootScope, UserService) {

        // save user from data express spits out in template
		UserService.storeUser(window.user);

        // TODO this should be a service
        $scope.getBills = function() {
            $http.get('/bills').success(function(data) {
                $scope.bills = data;
            });
        };

        // if we do not have any bills in scope, fetch them
        if (!$scope.bills || !$scope.bills.length) {
            $scope.getBills();
        }

        // testing $watch
		$scope.$watch('bills', function(oldData, newData, scope){});

        // wait for new bills to be added them add them to the bill scope
		$rootScope.$on('bill', function(evt, data) {
			$scope.bills.push(data);
		});

        // remove bills from the delete record method
        $scope.remove = function(array, index){
            array.splice(index, 1);
        };

        $scope.deleteRecord = function(recordId) {
            $http.delete('/bills/' + $scope.bills[recordId]._id).success(function(data) {
                $scope.remove($scope.bills, recordId);
            });
        };
	}])

	.controller('NewBillCtrl', ['$scope', '$http', '$rootScope', '$modal', 'UserService', function($scope, $http, $rootScope, $modal, UserService) {

		$scope.formState = true;

		$scope.toggleForm = function() {
			console.log('toggleForm');
			$scope.formState = !$scope.formState;
		};

		$scope.toggleModal = function() {
			var theModal = $modal({
				scope: $scope,
				template: '/partials/newbillmodal.html'
			});
			theModal.$promise.then(theModal.show);
		};

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
