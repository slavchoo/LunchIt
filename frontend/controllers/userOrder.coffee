moment = require 'moment'
_ = require "underscore"

class UserOrderController
	list: (req, res) ->

		UserOrder.find (err, models) ->
			if !err
				res.send models
			else
				console.log err

	create: (req, res) ->
		orderParams = req.body[0]
		console.log orderParams
		if !orderParams.order
			order = new Order({
				supplier: orderParams.supplier
				createdAt: orderParams.date
			})
			order.save()
			orderId = order._id
		else
			orderId = orderParams.order

		_.each req.body, (item) ->
			Dish.findById(item.dish).exec (err, doc) =>
				model = new UserOrder {
					dish: item.dish
					user: item.user
					quantity: item.quantity
					order: orderId,
					price: doc.price
				}
				model.save (err) ->
					if !err
						console.log 'user order created'
					else
						console.log err


	update: (req, res) ->
		UserOrder.findById req.params.id, (err, model) ->
			model.name = req.body.name
			model.category = req.body.category
			model.price = req.body.price
			model.save (err) ->
				if !err
					console.log 'dish updated'
				else
					console.log err
			res.send model

	delete: (req, res) ->
		UserOrder.findById req.params.id, (err, model) ->
			model.remove (err) ->
				if !err
					console.log 'DIsh removed'
					res.send ''
				console.log err

	orderDishes: (req, res) ->
		UserOrder.find({'order': req.params.id}).populate('user').exec (err, models) ->
			if !err
				res.send models
			else
				console.log err


	userOrder: (req, res) ->
		UserOrder.find({'order': req.params.orderId, 'user': req.params.userId}).populate('user').exec (err, modules) ->
			if !err
				res.send models
			else
				concole.log err
module.exports = new UserOrderController()