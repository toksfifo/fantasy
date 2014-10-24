'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Team Schema
 */
var TeamSchema = new Schema({
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
	league: {
		type: Schema.ObjectId,
		ref: 'League'
	},
	players: [
		{
			id: {
				type: Schema.ObjectId,
				ref: 'Player'
			},
			captain: {
				type: Boolean,
				default: false
			},
			role: {
				type: {
					type: String,
					enum: ['starter', 'bench', 'reserve']
				},
				default: ['reserve']
			}
		}
	],
	totalPoints: {
		type: Number,
		default: 0
	}
});

mongoose.model('Team', TeamSchema);
