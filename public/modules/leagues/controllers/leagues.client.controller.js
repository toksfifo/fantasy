'use strict';

// Leagues controller
angular.module('leagues').controller('LeaguesController', ['$scope', '$stateParams', '$location', '$modal', 'Authentication', 'Leagues',
	function($scope, $stateParams, $location, $modal, Authentication, Leagues) {
		$scope.authentication = Authentication;

		// Create new League
		$scope.create = function() {
			// Create new League object
			var league = new Leagues ({
				name: this.name
			});

			// Redirect after save
			league.$save(function(response) {
				$location.path('leagues/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Join a League
		$scope.join = function () {
			var league = $scope.league;
			if (league.passcode === this.passkey){
				league.members.push($scope.authentication.user);

				// Redirect after save
				league.$update(function() {
					$location.path('leagues/' + league._id);

					// Clear form fields
					$scope.passkey = '';
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			}else{
				$scope.error = 'Invalid league passcode';
			}
		};

		// Remove existing League
		$scope.remove = function( league ) {
			if ( league ) { league.$remove();

				for (var i in $scope.leagues ) {
					if ($scope.leagues [i] === league ) {
						$scope.leagues.splice(i, 1);
					}
				}
			} else {
				$scope.league.$remove(function() {
					$location.path('leagues');
				});
			}
		};

		// Update existing League
		$scope.update = function() {
			var league = $scope.league;

			league.$update(function() {
				$location.path('leagues/' + league._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Leagues
		$scope.find = function() {
			$scope.leagues = Leagues.query();
		};

		// Find existing League
		$scope.findOne = function() {
			$scope.league = Leagues.get({ 
				leagueId: $stateParams.leagueId
			});
		};

		$scope.isMemberOf = function(league) {
			var _league = league || $scope.league;
			var members = _league.members;
			return (members) ? members.map(function(member) {
						return member._id;
					}).indexOf($scope.authentication.user._id) !== -1 : false;
		};

		$scope.myTeamExists = function (league) {
			var _league = league || $scope.league;
			var teams = _league.teams;
			return (teams) ? teams.filter(function (team) {
						return team.user === $scope.authentication.user._id;
					})[0]	: false;
		};

		$scope.createTeam = function () {
			var modalInstance = $modal.open({
				templateUrl: 'modules/teams/views/create-team.client.view.html',
				controller: 'CreateModalTeamController',
				resolve: {
					league: function() {
						return $scope.league;
					}
				}
			});

			modalInstance.result.then(function (response) {
				$location.path('teams/' + response._id);
			});
		};
	}
]);
