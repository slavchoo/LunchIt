class UserOrderController
	list: (req, res) ->

		UserOrder.find (err, models) ->
			if !err
				res.send models
			else
				console.log err

	create: (req, res) ->
		model = new UserOrder {
			date: req.body.date
			userId: req.body.userId
		}
		model.save (err) ->
			if !err
				console.log 'dish created'
			else
				console.log err
		res.send model


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


module.exports = new UserOrderController()