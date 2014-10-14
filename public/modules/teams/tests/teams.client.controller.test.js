'use strict';

(function() {
	// Teams Controller Spec
	describe('Teams Controller Tests', function() {
		// Initialize global variables
		var TeamsController,
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

			// Initialize the Teams controller.
			TeamsController = $controller('TeamsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Team object fetched from XHR', inject(function(Teams) {
			// Create sample Team using the Teams service
			var sampleTeam = new Teams({
				name: 'New Team'
			});

			// Create a sample Teams array that includes the new Team
			var sampleTeams = [sampleTeam];

			// Set GET response
			$httpBackend.expectGET('teams').respond(sampleTeams);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.teams).toEqualData(sampleTeams);
		}));

		it('$scope.findOne() should create an array with one Team object fetched from XHR using a teamId URL parameter', inject(function(Teams) {
			// Define a sample Team object
			var sampleTeam = new Teams({
				name: 'New Team'
			});

			// Set the URL parameter
			$stateParams.teamId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/teams\/([0-9a-fA-F]{24})$/).respond(sampleTeam);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.team).toEqualData(sampleTeam);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Teams) {
			// Create a sample Team object
			var sampleTeamPostData = new Teams({
				name: 'New Team'
			});

			// Create a sample Team response
			var sampleTeamResponse = new Teams({
				_id: '525cf20451979dea2c000001',
				name: 'New Team'
			});

			// Fixture mock form input values
			scope.name = 'New Team';

			// Set POST response
			$httpBackend.expectPOST('teams', sampleTeamPostData).respond(sampleTeamResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Team was created
			expect($location.path()).toBe('/teams/' + sampleTeamResponse._id);
		}));

		it('$scope.update() should update a valid Team', inject(function(Teams) {
			// Define a sample Team put data
			var sampleTeamPutData = new Teams({
				_id: '525cf20451979dea2c000001',
				name: 'New Team'
			});

			// Mock Team in scope
			scope.team = sampleTeamPutData;

			// Set PUT response
			$httpBackend.expectPUT(/teams\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/teams/' + sampleTeamPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid teamId and remove the Team from the scope', inject(function(Teams) {
			// Create new Team object
			var sampleTeam = new Teams({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Teams array and include the Team
			scope.teams = [sampleTeam];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/teams\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTeam);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.teams.length).toBe(0);
		}));
	});
}());