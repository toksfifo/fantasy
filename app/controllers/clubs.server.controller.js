'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Club = mongoose.model('Club'),
	_ = require('lodash');

/**
 * Create a Club
 */
exports.create = function(req, res) {
	var club = new Club(req.body);
	club.user = req.user;

	club.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(club);
		}
	});
};

/**
 * Show the current Club
 */
exports.read = function(req, res) {
	res.jsonp(req.club);
};

/**
 * Update a Club
 */
exports.update = function(req, res) {
	var club = req.club ;

	club = _.extend(club , req.body);

	club.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(club);
		}
	});
};

/**
 * Delete an Club
 */
exports.delete = function(req, res) {
	var club = req.club ;

	club.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(club);
		}
	});
};

/**
 * List of Clubs
 */
exports.list = function(req, res) { Club.find().sort('-created').populate('user', 'displayName').exec(function(err, clubs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(clubs);
		}
	});
};

/**
 * Club middleware
 */
exports.clubByID = function(req, res, next, id) { Club.findById(id).populate('user', 'displayName').exec(function(err, club) {
		if (err) return next(err);
		if (! club) return next(new Error('Failed to load Club ' + id));
		req.club = club ;
		next();
	});
};

/**
 * Club authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.club.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};