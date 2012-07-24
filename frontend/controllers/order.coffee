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
		Order.findById(req.params.id).populate('supplier').exec (err, order) ->
			todayOrder = order

			mailerConfig =
				host : "smtp.gmail.com",
				port : "465",
				ssl: true,
				domain: 'smtp.gmail.com',
				to : todayOrder.supplier.address,
				from : "weavoradev@gmail.com",
				cc: todayOrder.supplier.cc,
				subject : todayOrder.supplier.subject,
				body: req.body.text,
				authentication : "login",
				username : "weavoradev",
				password : "0ynWRVe6Vx"

			mailer.send mailerConfig, (err, result) ->
				if !err
					todayOrder.sentAt = moment().unix()
					todayOrder.save()
					res.send todayOrder._id


	previewEmail: (req, res)->
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

					number = 0
					_.each ordersByUser, (userOrder) ->
						orderArray = []
						number += 1
						_.each userOrder, (order) ->
							orderArray.push(order.dish.name + (if order.quantity > 1  then ' (' + order.quantity + ' порции)' else ''))
						orderText += number + '. ' + orderArray.join(' + ') + '\n'

					if todayOrder.supplier.template
						orderText = _.template todayOrder.supplier.template, {orders: orderText, date: moment().format('DD-MM-YYYY')}

					res.send orderText

	day: (req, res) ->
		Order.findOne()
			.where('createdAt').gte(moment(req.params.date).unix()).lte(moment(req.params.date).add('days', 1).unix())
			.exec (err, model) ->
				if !err
					res.send model
				else
					console.log err


module.exports = new OrderController()