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
	}
});

LeagueSchema.methods.isMember = function (user) {
	return _.contains(this.members, user);
};

mongoose.model('League', LeagueSchema);
