mongoose = require 'mongoose'
Schema = mongoose.Schema

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

UserDayOrder = mongoose.model 'UserDayOrder', UserDayOrderSchema
global.UserDayOrder = UserDayOrder



