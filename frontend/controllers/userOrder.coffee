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
		orderId = 0
		if orderParams && !orderParams.order
			Supplier.findOne().exec (err, supplierModel ) ->
				console.log orderParams
				order = new Order({
					supplier: supplierModel._id
					createdAt: orderParams.date
				})
				order.save()
				orderId = order._id

				###
					Change this code!!!!
				###
				#remove all models and create new form request
				UserOrder.find({'order': orderId, 'user': orderParams.user}).exec (err, models) ->
					_.each models, (model) ->
						model.remove()

				_.each req.body, (item) ->
					Dish.findById(item.dish).exec (err, doc) =>
						model = new UserOrder {
							dish: item.dish
							user: item.user
							quantity: item.quantity
							order: orderId
							price: doc.price
						}
						model.save (err) ->
							if !err
								console.log 'user order created'
							else
								console.log err

				res.send orderId

		else
			orderId = orderParams.order
			###
					Change this code!!!!
				###
			#remove all models and create new form request
			UserOrder.find({'order': orderId, 'user': orderParams.user}).exec (err, models) ->
				_.each models, (model) ->
					model.remove()

				_.each req.body, (item) ->
					Dish.findById(item.dish).exec (err, doc) =>
						model = new UserOrder {
							dish: item.dish
							user: item.user
							quantity: item.quantity
							order: orderId
							price: doc.price
						}
						model.save (err) ->
							if !err
								console.log 'user order created'
							else
								console.log err

			res.send orderId


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
		UserOrder.find({'order': req.params.id}).populate('user').populate('dish').exec (err, models) ->
			if !err
				res.send models
			else
				console.log err


	userOrder: (req, res) ->
		UserOrder.find({'order': req.params.orderId, 'user': req.params.userId}).populate('user').exec (err, models) ->
			if !err
				res.send models
			else
				concole.log err

module.exports = new UserOrderController()