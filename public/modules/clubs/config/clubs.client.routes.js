'use strict';

//Setting up route
angular.module('clubs').config(['$stateProvider',
	function($stateProvider) {
		// Clubs state routing
		$stateProvider.
		state('listClubs', {
			url: '/clubs',
			templateUrl: 'modules/clubs/views/list-clubs.client.view.html'
		}).
		state('createClub', {
			url: '/clubs/create',
			templateUrl: 'modules/clubs/views/create-club.client.view.html'
		}).
		state('viewClub', {
			url: '/clubs/:clubId',
			templateUrl: 'modules/clubs/views/view-club.client.view.html'
		}).
		state('editClub', {
			url: '/clubs/:clubId/edit',
			templateUrl: 'modules/clubs/views/edit-club.client.view.html'
		});
	}
]);