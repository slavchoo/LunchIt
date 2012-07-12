mongoose = require 'mongoose'
Schema = mongoose.Schema
Query = mongoose.Query
ObjectId = Schema.ObjectId
crypto = require 'crypto'

UserOrderSchema = new Schema
	user_id:
		type: Schema.ObjectId
		ref: 'User'
		required: true
	day_order_id:
		type: Schema.ObjectId
		ref: 'UserOrder'
		required: true
	dish_id:
		type: Schema.ObjectId
		ref: 'Dish'
		required: true
	price:
		type: Number
		required: true
	createdAt:
		type: Date
		default: Date.now

toLower = (v) ->
	v.toLowerCase()

UserOrder = mongoose.model 'UserOrder', UserOrderSchema
global.UserOrder = UserOrder



