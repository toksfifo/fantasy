'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	_ = require('lodash');

/**
 * League Schema
 */
var LeagueSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: '{PATH} is required!',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	members: [
		{
		type: Schema.ObjectId,
		ref: 'User'
		}
	],
	teams: [
		{
			type: Schema.ObjectId,
			ref: 'Team'
		}
	],
	passcode: {
		type: String,
		required: '{PATH} is required!'
	},
	playerMapping: [
		{
			playerId: {
				type: Schema.ObjectId,
				ref: 'Player'
			},
			teamId: {
				type: Schema.ObjectId,
				ref: 'Team'
			}
		}
	]
},
{
	toJSON: {
		methods: true
	}
});

LeagueSchema.methods.assignPlayerToTeam = function (playerId, teamId) {
	this.playerMapping.push({playerId: playerId, teamId: teamId});
};

LeagueSchema.methods.playerAvailable = function (playerId) {
	return (!_.contains(_.map(this.playerMapping, function (mapping) {
				return mapping.playerId;
			}), playerId)
	);
};

mongoose.model('League', LeagueSchema);
