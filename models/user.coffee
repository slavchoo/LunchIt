mongoose = require 'mongoose'
Schema = mongoose.Schema

UserSchema = new Schema
	name:
		type: String
		required: true
	createdAt:
		type: Date
		default: Date.now

User = mongoose.model 'User', UserSchema
global.User = User



