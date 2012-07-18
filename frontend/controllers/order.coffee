moment = require 'moment'
_ = require "underscore"

class OrderController
	list: (req, res) ->

		Order.find()
			.where('createdAt').gte(moment(req.params.from).unix()).lte(moment(req.params.to).unix())
			.populate('supplier')
			.exec (err, models) ->
				if !err
					res.send models
				else
					console.log err

	create: (req, res) ->
		model = new Order {
			createdAt: req.body.createdAt
			supplier: req.body.supplier
			price: req.body.price
		}
		model.save (err) ->
			if !err
				console.log 'order created'
			else
				console.log err
		res.send model

	updateOrder: (req, res) ->
		UserOrder.find({'order': req.params.id}).exec (err, models) ->
			if !err
				_.each models, (model) ->
					model.price = req.body[model.dish]
					model.save()
					Dish.findById(model.dish).exec (err, dishItem) ->
						dishItem.price = model.price
						dishItem.save()
			else
				console.log err


module.exports = new OrderController()