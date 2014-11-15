'use strict';

//Setting up route
angular.module('market').config(['$stateProvider',
	function($stateProvider) {
		// Market state routing
		$stateProvider.
		state('marketHome', {
			url: '/market/:leagueId',
			templateUrl: 'modules/market/views/home-market.client.view.html'
		});
	}
]);
