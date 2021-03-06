'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Player = mongoose.model('Player');

/**
 * Globals
 */
var user, player;

/**
 * Unit tests
 */
describe('Player Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() {
			player = new Player({
				name: 'Player Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			player.name = 'Player';
			player.whoscoredId = 11111;
			return player.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name or whoscoredId', function(done) {
			return player.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Player.remove().exec();
		User.remove().exec();

		done();
	});
});
