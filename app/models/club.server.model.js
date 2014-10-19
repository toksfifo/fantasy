'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Club Schema
 */
var ClubSchema = new Schema({
	whoscoredId: {
		type: Number,
		require: true
	},
	name: {
		type: String,
		default: '',
		require: true,
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

mongoose.model('Club', ClubSchema);