mongoose = require 'mongoose'
Schema = mongoose.Schema
Query = mongoose.Query
ObjectId = Schema.ObjectId
crypto = require 'crypto'

DishSchema = new Schema
	name:
		type: String
		required: true
	category:
		type: String
	supplier:
		type: String
	price:
		type: String
	createdAt:
		type: Date
		default: Date.now

toLower = (v) ->
	v.toLowerCase()

Dish = mongoose.model 'Dish', DishSchema
global.Dish = Dish



