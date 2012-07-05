mongoose = require 'mongoose'
Schema = mongoose.Schema
Query = mongoose.Query
ObjectId = Schema.ObjectId
crypto = require 'crypto'

UserSchema = new Schema
	name:
		type: String
		required: true
	email:
		type: String
		required: true
		unique: true
		set: (v)->
						toLower(v)
	password:
		type: String
		set: (v)->
						setPassword(v)
	salt:
		type: String
	role: String
	status: String
	createdAt:
		type: Date
		default: Date.now

toLower = (v) ->
	v.toLowerCase()

UserSchema.path('email').validate (email) ->
		return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test email
	, 'invalid'

setPassword = (v) ->
	v.length ? v: this.password

UserSchema.pre 'save', (next) ->
	if !@salt
		if !@password
			@realPassword = crypto.randomBytes(4).toString 'hex'
			@password = @realPassword

		@generateSalt();
		@password = @hashPassword @password, @salt

	next()

User = mongoose.model 'User', UserSchema
global.User = User



