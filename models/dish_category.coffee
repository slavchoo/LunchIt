mongoose = require 'mongoose'
Schema = mongoose.Schema

DishCategorySchema = new Schema
	name:
		type: String
		required: true
	supplier:
		type: Schema.ObjectId
		ref: 'Supplier'
		required: true
	includeInOrder:
		type: Boolean
		default: true
	createdAt:
		type: Date
		default: Date.now

DishCategory = mongoose.model 'DishCategory', DishCategorySchema
global.DishCategory = DishCategory



