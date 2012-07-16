moment = require 'moment'

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


module.exports = new OrderController()