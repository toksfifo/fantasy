'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Team = mongoose.model('Team'),
	_ = require('lodash'),
	teamCreated,
	teamUpdated,
	teamDeleted,
	populateTeamQuery = [
	{
		path:'user',
		select:'_id displayName'
	},
	{
		path:'league',
		select:'_id name'
	},
	{
		path: 'players',
		select: '_id name'
	}
];

/**
 * Create a Team
 */
exports.create = function(req, res) {
	var team = new Team(req.body);
	team.user = req.user;

	team.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			teamCreated();
			res.jsonp(team);
		}
	});
};

/**
 * Show the current Team
 */
exports.read = function(req, res) {
	res.jsonp(req.team);
};

/**
 * Update a Team
 */
exports.update = function(req, res) {
	var team = req.team ;

	team = _.extend(team , req.body);

	team.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			teamUpdated();
			res.jsonp(team);
		}
	});
};

/**
 * Delete an Team
 */
exports.delete = function(req, res) {
	var team = req.team ;

	team.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			teamDeleted();
			res.jsonp(team);
		}
	});
};

/**
 * List of Teams
 */
exports.list = function(req, res) {
	Team.find().sort('-created').populate(populateTeamQuery).exec(function(err, teams) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(teams);
		}
	});
};

/**
 * Team middleware
 */
exports.teamByID = function(req, res, next, id) {
	Team.findById(id).populate(populateTeamQuery).exec(function(err, team) {
		if (err) return next(err);
		if (! team) return next(new Error('Failed to load Team ' + id));
		req.team = team ;
		next();
	});
};

/**
 * Team authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.team.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

exports.initSocket = function (io) {
	teamCreated = function () {
		io.sockets.emit('create team');
	};
	teamUpdated = function () {
		io.sockets.emit('update team');
	};
	teamDeleted = function () {
		io.sockets.emit('delete team');
	};
};
