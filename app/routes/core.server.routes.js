'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core'),
			api = require('../../app/controllers/webhooks');
	app.route('/').get(core.index);
	app.route('/api/league').post(api.standings);
	app.route('/api/clubs').post(api.clubs);
	app.route('/api/players').post(api.players);
};