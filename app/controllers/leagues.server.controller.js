'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	League = mongoose.model('League'),
	_ = require('lodash'),
	randomstring = require('randomstring'),
	populateLeagueQuery = [
	{
		path:'user',
		select:'_id displayName'
	},
	{
		path:'teams',
		select:'_id name'
	},
	{
		path: 'members',
		select: '_id displayName'
	}
];

/**
 * Create a League
 */
exports.create = function(req, res) {
	var league = new League({
		name: req.body.name,
		user: req.user,
		members: [req.user],
		passcode: randomstring.generate()
	});

	league.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(league);
		}
	});
};

/**
 * Show the current League
 */
exports.read = function(req, res) {
	res.jsonp(req.league);
};

/**
 * Update a League
 */
exports.update = function(req, res) {
	var league = req.league ;

	league = _.extend(league , req.body);

	league.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(league);
		}
	});
};

/**
 * Delete an League
 */
exports.delete = function(req, res) {
	var league = req.league ;

	league.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(league);
		}
	});
};

/**
 * List of Leagues
 */
exports.list = function(req, res) {
	League.find().sort('-created').populate(populateLeagueQuery).exec(function(err, leagues) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(leagues);
		}
	});
};

/**
 * League middleware
 */
exports.leagueByID = function(req, res, next, id) {
	League.findById(id).populate(populateLeagueQuery).exec(function(err, league) {
		if (err) return next(err);
		if (! league) return next(new Error('Failed to load League ' + id));
		req.league = league ;
		next();
	});
};

/**
 * League authorization middleware
 */
exports.hasOwnerAuthorization = function(req, res, next) {
	if (req.league.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

exports.hasMemberAuthorization = function(req, res, next) {
	var users = _.map(req.league.teams, function (team) {
		return team.user;
	});
	if (!_.contains(users, req.user)) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
