'use strict';

// Teams controller
angular.module('teams').controller('TeamsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Teams',
	function($scope, $stateParams, $location, Authentication, Teams ) {
		$scope.authentication = Authentication;

		// Remove existing Team
		$scope.remove = function( team ) {
			if ( team ) { team.$remove();

				for (var i in $scope.teams ) {
					if ($scope.teams [i] === team ) {
						$scope.teams.splice(i, 1);
					}
				}
			} else {
				$scope.team.$remove(function() {
					$location.path('teams');
				});
			}
		};

		// Update existing Team
		$scope.update = function() {
			var team = $scope.team ;

			team.$update(function() {
				$location.path('teams/' + team._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Teams
		$scope.find = function() {
			$scope.teams = Teams.query();
		};

		// Find existing Team
		$scope.findOne = function() {
			$scope.team = Teams.get({ 
				teamId: $stateParams.teamId
			});
		};
	}
]);

// Create Modal Teams controller
angular.module('teams').controller('CreateModalTeamController', ['$scope','$modalInstance', 'league', 'Teams',
	function($scope, $modalInstance, league, Teams ) {

		// Create new Team
		$scope.create = function() {
			var team = new Teams ({
				name: this.name,
				league: league._id
			});

			// Redirect after save
			team.$save(function(response) {
				league.teams.push(response._id);

				league.$update(function() {
					//$location.path('leagues/' + league._id);
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
				$modalInstance.close(response);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}
]);
