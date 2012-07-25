_ = require "underscore"

class UserDayOrderController
	unpaid: (req, res) ->
		UserDayOrder.find({is_paid: false}).populate('user').populate('order').exec (err, models) ->
			if !err
				_.each models, (model, index) =>
					model.order.getTotalUserOrder model.user._id, (result) =>
						model.order.total = result
					model.order.total = 1000


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