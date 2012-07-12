class OrderController
	list: (req, res) ->
		Order.find()
			.where('createdAt').gte(moment(req.params.startDay).unix()).lte(moment(req.params.lastDay).unix())
			.exec (err, models) ->
				if !err
					res.send models
				else
					console.log err

	create: (req, res) ->
		model = new Order {
		date: req.body.date
		userId: req.body.userId
		}
		model.save (err) ->
			if !err
				console.log 'dish created'
			else
				console.log err
		res.send model


module.exports = new OrderController()