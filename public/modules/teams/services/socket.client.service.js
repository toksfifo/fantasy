'use strict';

angular.module('teams').factory('socket', [ 'socketFactory',
	function(socketFactory) {
		return socketFactory();
	}
]);
