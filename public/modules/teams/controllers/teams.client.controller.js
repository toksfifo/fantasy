'use strict';

// Teams controller
angular.module('teams').controller('TeamsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Teams', 'socket',
	function($scope, $stateParams, $location, Authentication, Teams, socket ) {
		$scope.authentication = Authentication;
		$scope.teams = [];
		$scope.team = {};
		$scope.error = '';

		$scope.$on('socket:error', function (ev, data) {
			$scope.error = data;
		});

		socket.on('welcome', function (data) {
			console.log('This is the team controller subscribing to channel --> ' + data);
		});

		socket.on('create team', function () {
			console.log('A new Team has been added');
			$scope.$apply($scope.find());
		});

		socket.on('update team', function () {
			console.log('A Team was modified');
			$scope.$apply($scope.find());
		});

		socket.on('delete team', function () {
			console.log('A Team was deleted');
			$scope.$apply($scope.find());
		});

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
		$scope.error = '';

		$scope.$on('socket:error', function (ev, data) {
			$scope.error = data;
		});

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
