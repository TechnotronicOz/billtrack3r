'use strict';

/* Controllers */

angular.module('billApp.controllers', [])
	.controller('BillListCtrl', ['$scope', '$http', '$rootScope', 'UserService', 'BillService', function($scope, $http, $rootScope, UserService, BillService) {

        $scope.bills = BillService.query();

        // save user from data express spits out in template
		UserService.storeUser(window.user);

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
            /*$http.delete('/bills/' + $scope.bills[recordId]._id).success(function(data) {
                $scope.remove($scope.bills, recordId);
            });*/
            $scope.test = BillService.delete({ billId: $scope.bills[recordId]._id }, function(test) {
                //console.log('test', test);
                $scope.remove($scope.bills, recordId);
            });
        };
	}])

	.controller('NewBillCtrl', ['$scope', '$http', '$rootScope', 'UserService', function($scope, $http, $rootScope, UserService) {

		$scope.formState = true;

		$scope.toggleForm = function() {
			$scope.formState = !$scope.formState;
		};

       console.log('UserService', UserService);
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
