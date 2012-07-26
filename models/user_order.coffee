mongoose = require 'mongoose'
Schema = mongoose.Schema

UserOrderSchema = new Schema
	user:
		type: Schema.ObjectId
		ref: 'User'
		required: true
	order:
		type: Schema.ObjectId
		ref: 'Order'
		required: true
	dish:
		type: Schema.ObjectId
		ref: 'Dish'
		required: true
	quantity:
		type: Number
	price:
		type: Number
		required: true
	createdAt:
		type: Date
		default: Date.now

UserOrder = mongoose.model 'UserOrder', UserOrderSchema
global.UserOrder = UserOrder



