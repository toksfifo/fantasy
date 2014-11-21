'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'JogaBonito';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils', 'datatables'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('leagues');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('market');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('players');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('teams');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');

'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
		this.addMenuItem('topbar', 'Home', '/', '/');
		this.addMenuItem('topbar', 'Team', 'teams/me', '/teams');
		this.addMenuItem('topbar', 'Market', 'market', '/market');
	}
]);
'use strict';

// Configuring the Articles module
angular.module('leagues').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Leagues', 'leagues', 'dropdown', '/leagues(/create|/[a-fA-F0-9]{24}|/join|/[a-fA-F0-9]{24}/join)?');
		Menus.addSubMenuItem('topbar', 'leagues', 'List Leagues', 'leagues');
		Menus.addSubMenuItem('topbar', 'leagues', 'Create League', 'leagues/create');
	}
]);

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
				controller: 'newTeamModalController',
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

angular.module('teams').controller('newTeamModalController', ['$scope','$modalInstance', 'league', 'Teams',
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

'use strict';

//Leagues service used to communicate Leagues REST endpoints
angular.module('leagues').factory('Leagues', ['$resource',
	function($resource) {
		return $resource('leagues/:leagueId', { leagueId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
/**
 * Created by Kaosisochukwu on 10/12/2014.
 */
'use strict';
// Configuring the Market module
angular.module('market').run(['Menus',
	function(Menus) {
		// Set top bar menu items
//		Menus.addMenuItem('topbar', 'Market', 'market', '/market');
	}
]);
'use strict';

//Setting up route
angular.module('market').config(['$stateProvider',
	function($stateProvider) {
		// Market state routing
		$stateProvider.
		state('marketHome', {
			url: '/market',
			templateUrl: 'modules/market/views/home-market.client.view.html'
		});
	}
]);
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

'use strict';

//Teams service used to communicate Teams REST endpoints
angular.module('market').factory('Market', ['$resource',
	function($resource) {
		return $resource('market');
	}
]);
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
'use strict';

// Players controller
angular.module('players').controller('PlayersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Players',
	function($scope, $stateParams, $location, Authentication, Players ) {
		$scope.authentication = Authentication;

		// Create new Player
		$scope.create = function() {
			// Create new Player object
			var player = new Players ({
				name: this.name
			});

			// Redirect after save
			player.$save(function(response) {
				$location.path('players/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Player
		$scope.remove = function( player ) {
			if ( player ) { player.$remove();

				for (var i in $scope.players ) {
					if ($scope.players [i] === player ) {
						$scope.players.splice(i, 1);
					}
				}
			} else {
				$scope.player.$remove(function() {
					$location.path('players');
				});
			}
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

		// Find a list of Players
		$scope.find = function() {
			$scope.players = Players.query();
		};

		// Find existing Player
		$scope.findOne = function() {
			$scope.player = Players.get({ 
				playerId: $stateParams.playerId
			});
		};
	}
]);
'use strict';

//Players service used to communicate Players REST endpoints
angular.module('players').factory('Players', ['$resource',
	function($resource) {
		return $resource('players/:playerId', { playerId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('teams').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Teams', 'teams', 'dropdown', '/teams(/create)?');
		Menus.addSubMenuItem('topbar', 'teams', 'List Teams', 'teams');
		Menus.addSubMenuItem('topbar', 'teams', 'New Team', 'teams/create');
	}
]);
'use strict';

//Setting up route
angular.module('teams').config(['$stateProvider',
	function($stateProvider) {
		// Teams state routing
		$stateProvider.
		state('listTeams', {
			url: '/teams',
			templateUrl: 'modules/teams/views/list-teams.client.view.html'
		}).
		state('createTeam', {
			url: '/teams/create',
			templateUrl: 'modules/teams/views/create-team.client.view.html'
		}).
		state('viewTeam', {
			url: '/teams/:teamId',
			templateUrl: 'modules/teams/views/view-team.client.view.html'
		}).
		state('editTeam', {
			url: '/teams/:teamId/edit',
			templateUrl: 'modules/teams/views/edit-team.client.view.html'
		});
	}
]);
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

'use strict';

//Teams service used to communicate Teams REST endpoints
angular.module('teams').factory('Teams', ['$resource',
	function($resource) {
		return $resource('teams/:teamId', { teamId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invlaid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid){
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);
	
				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);

'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [

	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);