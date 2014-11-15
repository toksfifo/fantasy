'use strict';

angular.module('core').factory('socket', [ 'socketFactory',
	function(socketFactory) {
		return socketFactory();
	}
]);
