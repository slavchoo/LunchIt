mongoose = require 'mongoose'
Schema = mongoose.Schema
Query = mongoose.Query
ObjectId = Schema.ObjectId
crypto = require 'crypto'

SupplierSchema = new Schema
	name:
		type: String
		required: true
	address:
		type: String
	cc:
		type: String
	subject:
		type: String
	phone:
		type: String
	template:
		type: String
	note:
		type: String
	min_order:
		type: Number
	createdAt:
		type: Date
		default: Date.now

toLower = (v) ->
	v.toLowerCase()

Supplier = mongoose.model 'Supplier', SupplierSchema
global.Supplier = Supplier



