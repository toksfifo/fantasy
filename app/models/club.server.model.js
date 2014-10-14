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
	name: {
		type: String,
		default: '',
		required: 'Please fill Club name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Club', ClubSchema);