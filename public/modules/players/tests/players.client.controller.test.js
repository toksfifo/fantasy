'use strict';

(function() {
	// Players Controller Spec
	describe('Players Controller Tests', function() {
		// Initialize global variables
		var PlayersController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Players controller.
			PlayersController = $controller('PlayersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Player object fetched from XHR', inject(function(Players) {
			// Create sample Player using the Players service
			var samplePlayer = new Players({
				name: 'New Player'
			});

			// Create a sample Players array that includes the new Player
			var samplePlayers = [samplePlayer];

			// Set GET response
			$httpBackend.expectGET('players').respond(samplePlayers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.players).toEqualData(samplePlayers);
		}));

		it('$scope.findOne() should create an array with one Player object fetched from XHR using a playerId URL parameter', inject(function(Players) {
			// Define a sample Player object
			var samplePlayer = new Players({
				name: 'New Player'
			});

			// Set the URL parameter
			$stateParams.playerId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/players\/([0-9a-fA-F]{24})$/).respond(samplePlayer);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.player).toEqualData(samplePlayer);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Players) {
			// Create a sample Player object
			var samplePlayerPostData = new Players({
				name: 'New Player'
			});

			// Create a sample Player response
			var samplePlayerResponse = new Players({
				_id: '525cf20451979dea2c000001',
				name: 'New Player'
			});

			// Fixture mock form input values
			scope.name = 'New Player';

			// Set POST response
			$httpBackend.expectPOST('players', samplePlayerPostData).respond(samplePlayerResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Player was created
			expect($location.path()).toBe('/players/' + samplePlayerResponse._id);
		}));

		it('$scope.update() should update a valid Player', inject(function(Players) {
			// Define a sample Player put data
			var samplePlayerPutData = new Players({
				_id: '525cf20451979dea2c000001',
				name: 'New Player'
			});

			// Mock Player in scope
			scope.player = samplePlayerPutData;

			// Set PUT response
			$httpBackend.expectPUT(/players\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/players/' + samplePlayerPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid playerId and remove the Player from the scope', inject(function(Players) {
			// Create new Player object
			var samplePlayer = new Players({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Players array and include the Player
			scope.players = [samplePlayer];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/players\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePlayer);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.players.length).toBe(0);
		}));
	});
}());