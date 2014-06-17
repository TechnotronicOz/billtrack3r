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
	});
