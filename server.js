'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	request = require('request'),
	mongoose = require('mongoose'),
	http = require('http');

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

// Socket.io Communication
var server = http.createServer(app);
var io = require('socket.io').listen(server);
io.sockets.on('connection', require('./config/socket'));

// Start the app by listening on <port>
//app.listen(config.port);
server.listen(config.port, function () {
	// Logging initialization
	console.log('MEAN.JS application started on port ' + config.port);
});

// Expose app
exports = module.exports = app;
