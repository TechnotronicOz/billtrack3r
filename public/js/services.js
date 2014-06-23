'use strict';

/* Services */

angular.module('billApp.services', [])
	.factory('UserService', function() {
		var storedUser;
		return {
			storeUser: function(user) {
				storedUser = user;
			},
			getUser: function() {
				return storedUser;
			}
		}
	})
    .factory('Bills', ['$resource', function($resource) {
        return $resource('/bills/:billId', { billId: '@id' }, {
            query: {
                method: 'GET',
                params: {},
                isArray: true
            },
            delete: {
                method: 'DELETE',
                params:
            }
        });
    }]);


phonecatServices.factory('Phone', ['$resource',
    function($resource){
        return $resource('phones/:phoneId.json', {}, {
            query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
        });
    }]);