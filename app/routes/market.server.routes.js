'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var leagues = require('../../app/controllers/leagues');

	// Leagues Routes
	app.route('/leagues')
		.get(leagues.list)
		.post(users.requiresLogin, leagues.create);

	app.route('/leagues/:leagueId')
		.get(leagues.read)
		.put(users.requiresLogin, leagues.update)
		.delete(users.requiresLogin, leagues.hasOwnerAuthorization, leagues.delete);

	// Finish by binding the League middleware
	app.param('leagueId', leagues.leagueByID);
};
