'use strict';

/* Services */

angular.module('billApp.services', ['ngResource'])
	.factory('UserService', ['$resource', function($resource) {
		var storedUser;
        console.log('UserService factory');
		return {
			storeUser: function(user) {
				storedUser = user;
			},
			getUser: function() {
				return storedUser;
			}
		}
	}])
    .factory('BillService', ['$resource', function($resource) {
        console.log('BillService factory');
        return $resource('/bills/:billId', { billId: '@id' }, {
            query: {
                method: 'GET',
                params: {},
                isArray: true
            },
            delete: {
                method: 'DELETE',
                params: {}
            },
            create: {
                method: 'POST',
                params: {}
            }
        });
    }]);


/*phonecatServices.factory('Phone', ['$resource',
    function($resource){
        return $resource('phones/:phoneId.json', {}, {
            query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
        });
    }]); */