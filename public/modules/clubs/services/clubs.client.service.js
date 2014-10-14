'use strict';

//Clubs service used to communicate Clubs REST endpoints
angular.module('clubs').factory('Clubs', ['$resource',
	function($resource) {
		return $resource('clubs/:clubId', { clubId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);