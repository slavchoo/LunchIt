moment = require 'moment'
_ = require "underscore"
async = require('async');

class UserOrderController
	list: (req, res) ->
		UserOrder.find (err, models) ->
			if !err
				res.send models
			else
				console.log err

	create: (req, res) ->
		orderParams = req.body[0]
		orderId = if orderParams and orderParams.order then orderParams.order else undefined
		async.waterfall [(next) ->
				if orderId
					next null, orderId
				else
					Supplier.findOne().exec (err, supplierModel ) ->
						order = new Order({
							supplier: supplierModel._id
							createdAt: orderParams.date
						})
						order.save (err) ->
							orderId = order._id
							next err, orderId
			, (orderId, next) ->
				UserDayOrder.findOne({'order': orderId, 'user': orderParams.user}).exec (err, model) ->
					if !model
						userDayOrder = new UserDayOrder({
							order: orderId
							user: orderParams.user
						})
						userDayOrder.save (err) ->
							next null, orderId
					else
						next null, orderId

			, (orderId, next) ->
				UserOrder.find({'order': orderId, 'user': orderParams.user}).exec (err, models) ->
					next err, models
			, (models, next) ->
				async.forEach models, (model) ->
					model.remove()
				, next()
			, (next) ->
				console.log 'order point'
				console.log req.body
				async.forEach _.toArray(req.body), (item, onUserOrderSave) ->
					console.log 'each loop'
					Dish.findById(item.dish).exec (err, doc) =>
						model = new UserOrder {
							dish: item.dish
							user: item.user
							quantity: item.quantity
							order: orderId
							price: doc.price
						}
						model.save onUserOrderSave
				, next
		], (err) ->
			res.send ''
			#find by order id



#		if orderParams && !orderParams.order
#			Supplier.findOne().exec (err, supplierModel ) ->
#				order = new Order({
#					supplier: supplierModel._id
#					createdAt: orderParams.date
#				})
#				order.save()
#				orderId = order._id
#
#				###
#					Change this code!!!!
#				###
#				#remove all models and create new form request
#				UserOrder.find({'order': orderId, 'user': orderParams.user}).exec (err, models) ->
#					_.each models, (model) ->
#						model.remove()
#
#					_.each req.body, (item) ->
#						Dish.findById(item.dish).exec (err, doc) =>
#							model = new UserOrder {
#								dish: item.dish
#								user: item.user
#								quantity: item.quantity
#								order: orderId
#								price: doc.price
#							}
#							model.save (err) ->
#								if !err
#									console.log 'user order created'
#								else
#									console.log err
#
#					UserDayOrder.findOne({'order': orderId, 'user': orderParams.user}).exec (err, model) ->
#						if !model
#							userDayOrder = new UserDayOrder({
#								order: orderId
#								user: orderParams.user
#							})
#							userDayOrder.save()
#
#
#				res.send orderId
#
#		else
#			orderId = orderParams.order
#			###
#					Change this code!!!!
#				###
#			#remove all models and create new form request
#			UserOrder.find({'order': orderId, 'user': orderParams.user}).exec (err, models) ->
#				_.each models, (model) ->
#					model.remove()
#
#				_.each req.body, (item) ->
#					Dish.findById(item.dish).exec (err, doc) =>
#						model = new UserOrder {
#							dish: item.dish
#							user: item.user
#							quantity: item.quantity
#							order: orderId
#							price: doc.price
#						}
#						model.save (err) ->
#							if !err
#								console.log 'user order created'
#							else
#								console.log err
#
#				UserDayOrder.findOne({'order': orderId, 'user': orderParams.user}).exec (err, model) ->
#					if !model
#						userDayOrder = new UserDayOrder({
#							order: orderId
#							user: orderParams.user
#						})
#						userDayOrder.save()
#
#			res.send orderId


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

	deleteAll: (req, res) ->
		UserOrder.find({'order': req.params.orderId, 'user': req.params.userId}).exec (err, models) ->
			_.each models, (model) ->
				model.remove()

			UserDayOrder.findOne({'order': req.params.orderId, 'user': req.params.userId}).exec (err, model) ->
				model.remove()

			res.send {success: true}



module.exports = new UserOrderController()