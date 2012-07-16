mongoose = require 'mongoose'
Schema = mongoose.Schema
Query = mongoose.Query
ObjectId = Schema.ObjectId
crypto = require 'crypto'

OrderSchema = new Schema
	supplier:
		type: Schema.ObjectId
		ref: 'Supplier'
	price:
		type: Number
	sentAt:
		type: String
	createdAt:
		type: String

toLower = (v) ->
	v.toLowerCase()

Order = mongoose.model 'Order', OrderSchema
global.Order = Order



