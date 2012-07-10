mongoose = require 'mongoose'
Schema = mongoose.Schema
Query = mongoose.Query
ObjectId = Schema.ObjectId
crypto = require 'crypto'

UserSchema = new Schema
	name:
		type: String
		required: true
	createdAt:
		type: Date
		default: Date.now

toLower = (v) ->
	v.toLowerCase()

User = mongoose.model 'User', UserSchema
global.User = User


