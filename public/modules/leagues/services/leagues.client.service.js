'use strict';

//Leagues service used to communicate Leagues REST endpoints
angular.module('leagues').factory('Leagues', ['$resource',
	function($resource) {
		return $resource('leagues/:leagueId', { leagueId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);