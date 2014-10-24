'use strict';

(function() {
	// Leagues Controller Spec
	describe('Leagues Controller Tests', function() {
		// Initialize global variables
		var LeaguesController,
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

			// Initialize the Leagues controller.
			LeaguesController = $controller('LeaguesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one League object fetched from XHR', inject(function(Leagues) {
			// Create sample League using the Leagues service
			var sampleLeague = new Leagues({
				name: 'New League'
			});

			// Create a sample Leagues array that includes the new League
			var sampleLeagues = [sampleLeague];

			// Set GET response
			$httpBackend.expectGET('leagues').respond(sampleLeagues);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.leagues).toEqualData(sampleLeagues);
		}));

		it('$scope.findOne() should create an array with one League object fetched from XHR using a leagueId URL parameter', inject(function(Leagues) {
			// Define a sample League object
			var sampleLeague = new Leagues({
				name: 'New League'
			});

			// Set the URL parameter
			$stateParams.leagueId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/leagues\/([0-9a-fA-F]{24})$/).respond(sampleLeague);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.league).toEqualData(sampleLeague);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Leagues) {
			// Create a sample League object
			var sampleLeaguePostData = new Leagues({
				name: 'New League'
			});

			// Create a sample League response
			var sampleLeagueResponse = new Leagues({
				_id: '525cf20451979dea2c000001',
				name: 'New League'
			});

			// Fixture mock form input values
			scope.name = 'New League';

			// Set POST response
			$httpBackend.expectPOST('leagues', sampleLeaguePostData).respond(sampleLeagueResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the League was created
			expect($location.path()).toBe('/leagues/' + sampleLeagueResponse._id);
		}));

		it('$scope.update() should update a valid League', inject(function(Leagues) {
			// Define a sample League put data
			var sampleLeaguePutData = new Leagues({
				_id: '525cf20451979dea2c000001',
				name: 'New League'
			});

			// Mock League in scope
			scope.league = sampleLeaguePutData;

			// Set PUT response
			$httpBackend.expectPUT(/leagues\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/leagues/' + sampleLeaguePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid leagueId and remove the League from the scope', inject(function(Leagues) {
			// Create new League object
			var sampleLeague = new Leagues({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Leagues array and include the League
			scope.leagues = [sampleLeague];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/leagues\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleLeague);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.leagues.length).toBe(0);
		}));
	});
}());