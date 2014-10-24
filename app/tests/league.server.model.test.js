'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	request = require('request'),
	User = mongoose.model('User'),
	League = mongoose.model('League');

/**
 * Globals
 */
var user, league;

/**
 * Unit tests
 */
describe('League Model Unit Tests:', function() {
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
			league = new League({
				name: 'League Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			request('https://passwd.me/api/1.0/get_password.txt?type=random&length=10', function (err, response, body) {
				league.passcode = body;
				return league.save(function(err) {
					should.not.exist(err);
					done();
				});
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			league.name = '';

			return league.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		League.remove().exec();
		User.remove().exec();

		done();
	});
});
