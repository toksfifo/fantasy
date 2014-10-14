'use strict';

// Clubs controller
angular.module('clubs').controller('ClubsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Clubs',
	function($scope, $stateParams, $location, Authentication, Clubs ) {
		$scope.authentication = Authentication;

		// Create new Club
		$scope.create = function() {
			// Create new Club object
			var club = new Clubs ({
				name: this.name
			});

			// Redirect after save
			club.$save(function(response) {
				$location.path('clubs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Club
		$scope.remove = function( club ) {
			if ( club ) { club.$remove();

				for (var i in $scope.clubs ) {
					if ($scope.clubs [i] === club ) {
						$scope.clubs.splice(i, 1);
					}
				}
			} else {
				$scope.club.$remove(function() {
					$location.path('clubs');
				});
			}
		};

		// Update existing Club
		$scope.update = function() {
			var club = $scope.club ;

			club.$update(function() {
				$location.path('clubs/' + club._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Clubs
		$scope.find = function() {
			$scope.clubs = Clubs.query();
		};

		// Find existing Club
		$scope.findOne = function() {
			$scope.club = Clubs.get({ 
				clubId: $stateParams.clubId
			});
		};
	}
]);