'use strict';

// Leagues controller
angular.module('leagues').controller('LeaguesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Leagues',
	function($scope, $stateParams, $location, Authentication, Leagues ) {
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
				var members = league.members;
				members.push($scope.authentication.user);
				league.members = members;

				// Redirect after save
				league.$update(function() {
					$location.path('leagues/' + league._id);

					// Clear form fields
					$scope.passkey = '';
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
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
	}
]);