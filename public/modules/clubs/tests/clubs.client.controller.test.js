'use strict';

(function() {
	// Clubs Controller Spec
	describe('Clubs Controller Tests', function() {
		// Initialize global variables
		var ClubsController,
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

			// Initialize the Clubs controller.
			ClubsController = $controller('ClubsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Club object fetched from XHR', inject(function(Clubs) {
			// Create sample Club using the Clubs service
			var sampleClub = new Clubs({
				name: 'New Club'
			});

			// Create a sample Clubs array that includes the new Club
			var sampleClubs = [sampleClub];

			// Set GET response
			$httpBackend.expectGET('clubs').respond(sampleClubs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.clubs).toEqualData(sampleClubs);
		}));

		it('$scope.findOne() should create an array with one Club object fetched from XHR using a clubId URL parameter', inject(function(Clubs) {
			// Define a sample Club object
			var sampleClub = new Clubs({
				name: 'New Club'
			});

			// Set the URL parameter
			$stateParams.clubId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/clubs\/([0-9a-fA-F]{24})$/).respond(sampleClub);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.club).toEqualData(sampleClub);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Clubs) {
			// Create a sample Club object
			var sampleClubPostData = new Clubs({
				name: 'New Club'
			});

			// Create a sample Club response
			var sampleClubResponse = new Clubs({
				_id: '525cf20451979dea2c000001',
				name: 'New Club'
			});

			// Fixture mock form input values
			scope.name = 'New Club';

			// Set POST response
			$httpBackend.expectPOST('clubs', sampleClubPostData).respond(sampleClubResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Club was created
			expect($location.path()).toBe('/clubs/' + sampleClubResponse._id);
		}));

		it('$scope.update() should update a valid Club', inject(function(Clubs) {
			// Define a sample Club put data
			var sampleClubPutData = new Clubs({
				_id: '525cf20451979dea2c000001',
				name: 'New Club'
			});

			// Mock Club in scope
			scope.club = sampleClubPutData;

			// Set PUT response
			$httpBackend.expectPUT(/clubs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/clubs/' + sampleClubPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid clubId and remove the Club from the scope', inject(function(Clubs) {
			// Create new Club object
			var sampleClub = new Clubs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Clubs array and include the Club
			scope.clubs = [sampleClub];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/clubs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleClub);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.clubs.length).toBe(0);
		}));
	});
}());