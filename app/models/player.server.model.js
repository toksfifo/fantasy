'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Player Schema
 */
var PlayerSchema = new Schema({
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
	_club: {
		type: Schema.ObjectId,
		ref: 'Club'
	},
	bio: {
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
		}
	},
	stats: {
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
		}
	},
	averages: {
		shooting: {
			type: Number,
			default: 0,
			set: function (val) {
				return (val === '-' || val === 'N/A') ? 0 : val;
			}
		},
		passing: {
			type: Number,
			default: 0,
			set: function (val) {
				return (val === '-' || val === 'N/A') ? 0 : val;
			}
		},
		heading: {
			type: Number,
			default: 0,
			set: function (val) {
				return (val === '-' || val === 'N/A') ? 0 : val;
			}
		},
		rating: {
			type: Number,
			default: 0,
			set: function (val) {
				return (val === '-' || val === 'N/A') ? 0 : val;
			}
		}
	},
	motm: {
		type: Number,
		default: 0,
		set: function (val) {
			return (val === '-' || val === 'N/A') ? 0 : val;
		}
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
})/*.index({whoscoredId: 1}, {name: 'whoscoredId', unique: true})*/;

mongoose.model('Player', PlayerSchema);