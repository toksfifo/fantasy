'use strict';

// Teams controller
angular.module('market').controller('MarketController', ['$scope', '$stateParams', '$location', 'Authentication', 'Clubs', 'Players',
	function($scope, $stateParams, $location, Authentication, Clubs, Players ) {
		$scope.authentication = Authentication;

	}
]);