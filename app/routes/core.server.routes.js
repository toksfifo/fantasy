'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core'),
		users = require('../../app/controllers/users');

	app.route('/').get(core.index);

	app.route('/reset')
		.get(users.requiresLogin, users.hasAuthorization(['admin']), core.resetDB);
};
