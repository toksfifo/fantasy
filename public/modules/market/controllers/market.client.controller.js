'use strict';
/*global $:false, jQuery:false */

// Teams controller
angular.module('market').controller('MarketController', ['$scope', '$stateParams', '$location', 'Authentication', 'Players', 'DTOptionsBuilder', 'DTColumnDefBuilder',
	function($scope, $stateParams, $location, Authentication, Players, DTOptionsBuilder, DTColumnDefBuilder ) {
		$scope.authentication = Authentication;

		// Find a list of Players
		$scope.find = function() {
			$scope.players = Players.query();
		};

		$scope.selectedImage = '';
		$scope.selectedText = '';
		$scope.someClickHandler = function(info) {
			$scope.selectedImage = info[0].replace('&amp;','&');
			$scope.selectedText = '<p>' + info[1] + '</p>'+'<p>' + info[3] + '</p>';
		};

		$scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
			return Players.query().$promise;
		}).withPaginationType('simple_numbers').withDisplayLength(16)
			.withBootstrap().withScroller().withOption('deferRender', true)
			// Do not forget to add the scorllY option!!!
			.withOption('scrollY', 600)
			.withOption('rowCallback', function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				// Unbind first in order to avoid any duplicate handler
				// (see https://github.com/l-lin/angular-datatables/issues/87)
				$('td',nRow).unbind('click');
				$('td', nRow).bind('click', function() {
					$scope.$apply(function() {
						$scope.someClickHandler(aData);
					});
				});
				return nRow;
			});

		$scope.dtColumnDefs = [
			DTColumnDefBuilder.newColumnDef(0).notVisible(),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3),
			DTColumnDefBuilder.newColumnDef(4),
			DTColumnDefBuilder.newColumnDef(5).notVisible()
		];

		// Find existing Player
		$scope.findOne = function() {
			$scope.player = Players.get({
				playerId: $stateParams.playerId
			});
		};

		// Update existing Player
		$scope.update = function() {
			var player = $scope.player ;

			player.$update(function() {
				$location.path('players/' + player._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
