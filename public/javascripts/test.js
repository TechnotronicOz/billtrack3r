var myAppMod = angular.module('myApp', []);

myAppMod.controller('BillListController', function($scope, $http) {
    $http.get('/bills').success(function(ret) {
        console.log('ret', ret);
    });
    $scope.bills = [
        {
            id: 1,
            name: 'Nebraska Furniture Mart',
            due_date: new Date('5/18/2014'),
            amount: 25,
            pd_date: new Date('5/11/2014'),
            pd_amt: 250,
            conf: '4580131'
        },
        {
            id: 2,
            name: 'Wells Fargo Dealer Services',
            due_Date: new Date('5/30/2014'),
            amount: 380,
            pd_date: null,
            pd_amt: 0,
            conf: ''
        },
        {
            id: 3,
            name: 'KCP&L',
            due_date: new Date('5/11/2014'),
            amount: 75,
            pd_date: new Date('5/9/2014'),
            pd_amt: 75,
            conf: '1234'
        }
    ];

    $scope.remove = function(index) {
        $scope.bills.splice(index, 1);
    }
});

myAppMod.controller('NewBillCtrl', function($scope, $http) {
    $scope.SaveData = function() {
        console.log($scope);
        $http.post('/bills', $scope.bill).success(function(data) {
            console.log('success', data);
        }).error(function(data) {
            console.log('error', data);
        });
    };
    /* $http.post('/bills').success(function(data) {
        console.log('success', data);
    }).error(function(data) {
        console.log('error', data);
    }); */
});