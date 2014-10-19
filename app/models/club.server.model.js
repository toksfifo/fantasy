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
	games: {
		played: {
			type: Number,
			default: 0,
			set: function (val) {
				return (val === '-' || val === 'N/A') ? 0 : val;
			}
		},
		won: {
			type: Number,
			default: 0,
			set: function (val) {
				return (val === '-' || val === 'N/A') ? 0 : val;
			}
		},
		drawn: {
			type: Number,
			default: 0,
			set: function (val) {
				return (val === '-' || val === 'N/A') ? 0 : val;
			}
		},
		lost: {
			type: Number,
			default: 0,
			set: function (val) {
				return (val === '-' || val === 'N/A') ? 0 : val;
			}
		}
	},
	goals: {
		scored: {
			type: Number,
			default: 0,
			set: function (val) {
				return (val === '-' || val === 'N/A') ? 0 : val;
			}
		},
		conceded: {
			type: Number,
			default: 0,
			set: function (val) {
				return (val === '-' || val === 'N/A') ? 0 : val;
			}
		},
		difference: {
			type: Number,
			default: 0,
			set: function (val) {
				return (val === '-' || val === 'N/A') ? 0 : val;
			}
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
})/*.index({whoscoredId: 1, name: 1}, {name: 'whoscoredIdAndName', unique: true})*/;

mongoose.model('Club', ClubSchema);