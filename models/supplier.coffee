mongoose = require 'mongoose'
Schema = mongoose.Schema

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

Supplier = mongoose.model 'Supplier', SupplierSchema
global.Supplier = Supplier



