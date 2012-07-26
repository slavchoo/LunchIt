mongoose = require 'mongoose'
Schema = mongoose.Schema
_ = require "underscore"

OrderSchema = new Schema
	supplier:
		type: Schema.ObjectId
		ref: 'Supplier'
		required: true
	sentAt:
		type: String
	createdAt:
		type: String
	payer:
		type: Schema.ObjectId
		ref: 'User'
	total:
		type: Number


OrderSchema.methods.getTotalUserOrder = findUserOrders = (userId, cb) ->
	total = 0
	UserOrder.find({'order': @id, 'user': userId}).exec (err, models) ->
		_.each models, (model) ->
			total += model.price * model.quantity
		cb(total)





Order = mongoose.model 'Order', OrderSchema
global.Order = Order



