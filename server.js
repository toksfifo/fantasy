'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	request = require('request'),
	mongoose = require('mongoose');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error('\x1b[31m', 'Could not connect to MongoDB!');
		console.log(err);
	}
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

/**
 * Request kimono APIs
 */

// Get league standings
request(config.kimono.URL + config.kimono.league.apiURL + '?apikey=' + config.kimono.apiKey, function (err, response, body) {
	//TODO: This works. Next step will be to set up webhooks to handle kimono POST
	var result = JSON.parse(body);
	console.log('The last successful run was on ' + result.lastsuccess);
	console.log('The last new update to data was on ' + result.thisversionrun);
});

// Get the list of teams in the league
request(config.kimono.URL + config.kimono.teams.apiURL + '?apikey=' + config.kimono.apiKey, function (err, response, body) {
	//TODO: This works. Next step will be to set up webhooks to handle kimono POST
	var result = JSON.parse(body);
	console.log('The last successful run was on ' + result.lastsuccess);
	console.log('The last new update to data was on ' + result.thisversionrun);
});

// Get list of players in the teams
request(config.kimono.URL + config.kimono.players.apiURL + '?apikey=' + config.kimono.apiKey, function (err, response, body) {
	//TODO: This works. Next step will be to set up webhooks to handle kimono POST
	var result = JSON.parse(body);
	console.log('The last successful run was on ' + result.lastsuccess);
	console.log('The last new update to data was on ' + result.thisversionrun);
});

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);