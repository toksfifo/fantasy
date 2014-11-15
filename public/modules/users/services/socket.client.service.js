'use strict';

angular.module('users').factory('socket', [ 'socketFactory',
	function(socketFactory) {
		return socketFactory();
	}
]);
