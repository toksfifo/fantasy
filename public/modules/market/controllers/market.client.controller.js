'use strict';
/*global $:false, jQuery:false */

// Teams controller
angular.module('market').controller('MarketController', ['$scope', '$stateParams', '$location', 'Authentication', 'Leagues', 'Players', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'socket',
	function($scope, $stateParams, $location, Authentication, Leagues, Players, DTOptionsBuilder, DTColumnDefBuilder, socket ) {
		$scope.authentication = Authentication;

		// Find a list of Players
		$scope.find = function() {
			$scope.players = Players.query();
			$scope.league = Leagues.get({
				leagueId: $stateParams.leagueId
			});
		};

		$scope.selectedImage = '';
		$scope.selectedText = '';
		$scope.rowClickHandler = function(info) {
			console.log(info);
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
						$scope.rowClickHandler(aData);
					});
				});
				return nRow;
			});

		$scope.dtColumnDefs = [
			// player.picture
			DTColumnDefBuilder.newColumnDef(0).notVisible(),
			// player.name
			DTColumnDefBuilder.newColumnDef(1),
			// $scope.getCurrentTeam(player._id)
			DTColumnDefBuilder.newColumnDef(2),
			// player.position
			DTColumnDefBuilder.newColumnDef(3),
			// player.averageRating
			DTColumnDefBuilder.newColumnDef(4),
			//player._id
			DTColumnDefBuilder.newColumnDef(5).notVisible()
		];

		// Find current team for a player
		$scope.getCurrentTeam = function(playerId) {
			//console.log($scope.league);
		};

		$scope.buyPlayer = function (playerId) {

		};

		socket.on('send:name', function (data) {
			console.log(data);
		});

		socket.on('send:time', function (data) {
			console.log(data);
		});
	}
]);
