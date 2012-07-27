mongoose = require 'mongoose'
Schema = mongoose.Schema

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
	includeInOrder:
		type: Boolean
		default: true
	includeInPayment:
		type: Boolean
		default: true
	createdAt:
		type: Date
		default: Date.now

Dish = mongoose.model 'Dish', DishSchema
global.Dish = Dish



