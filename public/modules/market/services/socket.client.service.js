'use strict';

angular.module('market').factory('socket', [ 'socketFactory',
	function(socketFactory) {
		return socketFactory();
	}
]);
