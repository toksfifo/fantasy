'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var clubs = require('../../app/controllers/clubs');

	// Clubs Routes
	app.route('/reset').get(clubs.reset);

	app.route('/clubs')
		.get(clubs.list)
		.post(users.requiresLogin, clubs.create);

	app.route('/clubs/:clubId')
		.get(clubs.read)
		.put(users.requiresLogin, clubs.hasAuthorization, clubs.update)
		.delete(users.requiresLogin, clubs.hasAuthorization, clubs.delete);

	// Finish by binding the Club middleware
	app.param('clubId', clubs.clubByID);
};