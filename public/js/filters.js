'use strict';

/* Filters */

angular.module('billApp.filters', [])
 	.filter('momentFromNow', function() {
 		return function(input) {
 			return new moment(input).from(new Date);
 		}
 	})
 	.filter('momentCalendar', function() {
 		return function(input) {
 			return new moment(input).calendar();
 		}
 	});
