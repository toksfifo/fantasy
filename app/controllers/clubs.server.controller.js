'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Club = mongoose.model('Club'),
	Player = mongoose.model('Player'),
	data = require('../../config/data'),
	async = require('async'),
	_ = require('lodash');

/**
 * Reset db with clubs in data.js
 */
exports.reset = function (req, res) {
	var response = {errors: []};

	// drop the collections
	var models = [Club, Player];
	var dropIterator = function(Model_, callback){
		var i = new Model_();
		i.collection.drop(function(err){
			callback(err);
		});
	};
	async.forEach(models, dropIterator, function(err){
		response.errors.push(err);
	});

	// index collections
	mongoose.connection.db.collectionNames(function (err, names) {
		var collections = ['clubs', 'players'];
//		console.log(collections);
		var indexIterator = function(collection_name, callback){
			mongoose.connection.db.collection(collection_name, function (err, collection) {
				var indexName = ''+collection_name+'Index';
				console.log(indexName);
				collection.ensureIndex({whoscoredId: 1}, {name: indexName, unique: true}, function(err, result){
					callback(err);
				});
			});
		};
		async.forEach(collections, indexIterator, function(err) {
			response.errors.push(err);

			// populate clubs
			var clubIterator = function (item, callback) {
				var club = new Club({
					whoscoredId: item.id,
					name: item.name,
					logo: item.logo,
					gamesPlayed: item.games,
					gamesWon: item.won,
					gamesDrawn: item.draw,
					gamesLost: item.loss,
					goalsScored: item.scored,
					goalsConceded: item.conceded,
					goalsDifference: item.diff,
					points: item.points
				});

				club.save(function (err) {
					if (err) response.errors.push(errorHandler.getErrorMessage(err));

					_(item.players).forEach(function (element) {
						var player = new Player({
							whoscoredId: element.id,
							name: element.fullname,
							picture: element.picture,
							country: element.country,
							position: element.position,
							age: element.age,
							shirt: element.shirt,
							height: element.height,
							weight: element.weight,
							minutes: element.minutes,
							starts: element.starts,
							subs: element.subs,
							goals: element.goals,
							assists: element.assists,
							yellows: element.yellows,
							reds: element.reds,
							averageShooting: element.shots,
							averagePassing: element.passing,
							averageHeading: element.heading,
							averageRating: element.average,
							motm: element.motm,
							_club: club._id
						});

						player.save(function (err) {
							if (err) response.errors.push(errorHandler.getErrorMessage(err));
						});
					});
				});
				callback();
			};
			async.forEachSeries(data, clubIterator, function(err){
				response.errors.push(err);
				res.redirect('/');
			});
		});
	});
};

/**
 * Create a Club
 */
exports.create = function(req, res) {
	var club = new Club(req.body);

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