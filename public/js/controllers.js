'use strict';

/* Controllers */

angular.module('billApp.controllers', [])
	.controller('BillListCtrl', ['$scope', '$http', '$rootScope', 'UserService', function($scope, $http, $rootScope, UserService) {
		console.log('BillListCtrl');
		UserService.storeUser(window.user);

		$http.get('/bills').success(function(data) {
			console.log('data', data);
			$scope.bills = data;
		});

		$scope.$watch('bills', function(oldData, newData, scope){});

		$rootScope.$on('bill', function(evt, data) {
			$scope.bills.push(data);
		});
	}])
	
	.controller('NewBillCtrl', ['$scope', '$http', '$rootScope', '$modal', 'UserService', function($scope, $http, $rootScope, $modal, UserService) {
		console.log('NewBillCtrl');
		$scope.formState = false;

		$scope.toggleForm = function() {
			console.log('toggleForm');
			$scope.formState = !$scope.formState;
		}

		$scope.toggleModal = function() {
			var theModal = $modal({
				scope: $scope,
				template: '/partials/newbillmodal.html'
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
		}
	}]);
