mongoose = require 'mongoose'
Schema = mongoose.Schema
Query = mongoose.Query
ObjectId = Schema.ObjectId
crypto = require 'crypto'

UserDayOrderSchema = new Schema
	user:
		type: Schema.ObjectId
		ref: 'User'
		required: true
	order:
		type: Schema.ObjectId
		ref: 'Order'
		required: true
	is_paid:
		type: Boolean
		default: false

toLower = (v) ->
	v.toLowerCase()

UserDayOrder = mongoose.model 'UserDayOrder', UserDayOrderSchema
global.UserDayOrder = UserDayOrder



