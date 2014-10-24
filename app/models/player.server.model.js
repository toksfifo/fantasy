'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	uniqueValidator = require('mongoose-unique-validator'),
	Schema = mongoose.Schema;

/**
 * Player Schema
 */
var PlayerSchema = new Schema({
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
	picture: {
		type: String,
		default: 'http://placehold.it/100x150&text=Player+Picture'
	},
	country: {
		type: String,
		default: ''
	},
	position: {
		type: String,
		default: ''
	},
	age: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	shirt: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	height: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	weight: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	minutes: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	goals: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	starts: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	subs: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	assists: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	yellows: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	reds: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	averageShooting: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	averagePassing: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	averageHeading: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	averageRating: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	motm: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	}
});

PlayerSchema.plugin(uniqueValidator,  { message: 'Error, expected {PATH} to be unique.' });

mongoose.model('Player', PlayerSchema);
