'use strict';

//Setting up route
angular.module('players').config(['$stateProvider',
	function($stateProvider) {
		// Players state routing
		$stateProvider.
		state('listPlayers', {
			url: '/players',
			templateUrl: 'modules/players/views/list-players.client.view.html'
		}).
		state('createPlayer', {
			url: '/players/create',
			templateUrl: 'modules/players/views/create-player.client.view.html'
		}).
		state('viewPlayer', {
			url: '/players/:playerId',
			templateUrl: 'modules/players/views/view-player.client.view.html'
		}).
		state('editPlayer', {
			url: '/players/:playerId/edit',
			templateUrl: 'modules/players/views/edit-player.client.view.html'
		});
	}
]);