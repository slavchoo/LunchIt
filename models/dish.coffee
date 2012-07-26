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
	createdAt:
		type: Date
		default: Date.now

Dish = mongoose.model 'Dish', DishSchema
global.Dish = Dish



