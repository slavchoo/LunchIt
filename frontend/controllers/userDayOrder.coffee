_ = require "underscore"
async = require('async');

class UserDayOrderController
	unpaid: (req, res) ->
		if req.params.user
			UserDayOrder
				.find({is_paid: false})
				.populate('user')
				.populate('order', null, { payer: req.params.user})
				.exec (err, models) ->
					async.reduce(models, [], (userOrders, userDayOrder, onUserDayOrder) ->
						if (_.isEmpty(userDayOrder.order))
							onUserDayOrder null, userOrders
							return

						userDayOrder.order.getTotalUserOrder userDayOrder.user._id, (result) =>
							userDayOrder.order.total = result
							userOrders.push userDayOrder
							onUserDayOrder null, userOrders
					, (err, userOrders) ->
						res.send userOrders
					)
		else
			UserDayOrder.find({is_paid: false}).populate('user').populate('order').exec (err, models) ->
				if !err
					async.map models, (model, callback) ->
						model.order.getTotalUserOrder model.user._id, (result) =>
							model.order.total = result
							callback null, model
					, (err, models) ->
						res.send models
				else
					console.log err

	pay: (req, res) ->
		_.each req.body, (orderId) ->
			UserDayOrder.findById(orderId).exec (err, model) ->
				model.is_paid = true
				model.save()

		res.send true


module.exports = new UserDayOrderController()