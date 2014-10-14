'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var players = require('../../app/controllers/players');

	// Players Routes
	app.route('/players')
		.get(players.list)
		.post(users.requiresLogin, players.create);

	app.route('/players/:playerId')
		.get(players.read)
		.put(users.requiresLogin, players.hasAuthorization, players.update)
		.delete(users.requiresLogin, players.hasAuthorization, players.delete);

	// Finish by binding the Player middleware
	app.param('playerId', players.playerByID);
};