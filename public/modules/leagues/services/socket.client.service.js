'use strict';

angular.module('leagues').factory('socket', [ 'socketFactory',
	function(socketFactory) {
		return socketFactory();
	}
]);
