'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Player = mongoose.model('Player'),
	data = require('../../config/data'),
	async = require('async'),
	_ = require('lodash');

/**
 * Reset db with players in data.js
 */
exports.resetDB = function (req, res) {
	var response = {errors: []};

	// drop the collections
	var models = [Player];
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
		var collections = ['players'];
		var indexIterator = function(collection_name, callback){
			mongoose.connection.db.collection(collection_name, function (err, collection) {
				var indexName = ''+collection_name+'Index';
				collection.ensureIndex({whoscoredId: 1}, {name: indexName, unique: true}, function(err, result){
					callback(err);
				});
			});
		};
		async.forEach(collections, indexIterator, function(err) {
			response.errors.push(err);

			// populate clubs
			var playerIterator = function (item, callback) {
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
						clubName: item.name,
						clubLogo: item.logo
					});

					player.save(function (err) {
						if (err) response.errors.push(errorHandler.getErrorMessage(err));
					});
				});
				callback();
			};
			async.forEachSeries(data, playerIterator, function(err){
				response.errors.push(err);
				res.redirect('/');
			});
		});
	});
};


exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null
	});
};
