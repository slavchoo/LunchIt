moment = require 'moment'
_ = require "underscore"
mailer = require "mailer"

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
		console.log req.body
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

	send: (req, res)->
		UserOrder.find({'order': req.params.id}).populate('dish').populate('user').exec (err, userOrders) ->
			if !err
				todayOrder = {}
				Order.findById(req.params.id).populate('supplier').exec (err, order) ->
					todayOrder = order

					ordersByUser = {}
					_.each userOrders, (userOrder) ->
						ordersByUser[userOrder.user._id] = [] if !ordersByUser[userOrder.user._id]
						ordersByUser[userOrder.user._id].push(userOrder)

					orderText = ''
					_.each ordersByUser, (userOrder) ->
						_.each userOrder, (order) ->
							orderText += '"' + order.dish.name + '" ' + order.quantity + ' шт.\n'

					if todayOrder.supplier.template
						todayOrder.sentAt = moment().unix()
						todayOrder.save()
						orderText = _.template todayOrder.supplier.template, {orders: orderText, date: moment().format('DD-MM-YYYY')}

						mailerConfig =
							host : "smtp.gmail.com",
							port : "465",
							ssl: true,
							domain: 'smtp.gmail.com',
							to : todayOrder.supplier.address,
							from : "weavoradev@gmail.com",
							subject : todayOrder.supplier.subject,
							body: orderText,
							authentication : "login",
							username : "weavoradev",
							password : "0ynWRVe6Vx"

						mailer.send mailerConfig, (err, result) ->
							console.log 'ok'




					res.send order

module.exports = new OrderController()