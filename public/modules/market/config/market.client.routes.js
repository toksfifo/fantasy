'use strict';

//Setting up route
angular.module('market').config(['$stateProvider',
	function($stateProvider) {
		// Market state routing
		$stateProvider.
		state('marketHome', {
			url: '/market',
			templateUrl: 'modules/market/views/home-market.client.view.html'
		});
	}
]);