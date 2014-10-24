'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	uniqueValidator = require('mongoose-unique-validator'),
	Schema = mongoose.Schema;

/**
 * Club Schema
 */
var ClubSchema = new Schema({
	whoscoredId: {
		type: Number,
		required: '{PATH} is required!',
		unique: true
	},
	name: {
		type: String,
		default: '',
		required: '{PATH} is required!',
		trim: true
	},
	logo: {
		type: String,
		default: 'http://placehold.it/70x70&text=Club+Logo'
	},
	gamesPlayed: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	gamesWon: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	gamesDrawn: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	gamesLost: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	goalsScored: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	goalsConceded: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	goalsDifference: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	points: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	players: [
		{
			type: Schema.ObjectId,
			ref: 'Player'
		}
	]
});

ClubSchema.plugin(uniqueValidator,  { message: 'Error, expected {PATH} to be unique.' });

mongoose.model('Club', ClubSchema);
