'use strict';

//Setting up route
angular.module('leagues').config(['$stateProvider',
	function($stateProvider) {
		// Leagues state routing
		$stateProvider.
		state('listLeagues', {
			url: '/leagues',
			templateUrl: 'modules/leagues/views/list-leagues.client.view.html'
		}).
		state('createLeague', {
			url: '/leagues/create',
			templateUrl: 'modules/leagues/views/create-league.client.view.html'
		}).
		state('viewLeague', {
			url: '/leagues/:leagueId',
			templateUrl: 'modules/leagues/views/view-league.client.view.html'
		}).
		state('editLeague', {
			url: '/leagues/:leagueId/edit',
			templateUrl: 'modules/leagues/views/edit-league.client.view.html'
		}).
		state('joinLeague', {
			url: '/leagues/:leagueId/join',
			templateUrl: 'modules/leagues/views/join-league.client.view.html'
		});
	}
]);
