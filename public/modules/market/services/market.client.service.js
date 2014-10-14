'use strict';

//Teams service used to communicate Teams REST endpoints
angular.module('market').factory('Market', ['$resource',
	function($resource) {
		return $resource('market');
	}
]);