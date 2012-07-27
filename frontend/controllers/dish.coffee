class DishController
	list: (req, res) ->

		Dish.find().sort('category', 1, 'name', 1).exec (err, models) ->
			if !err
				res.send models
			else
				console.log err

	create: (req, res) ->
		model = new Dish {
			name: req.body.name
			category: req.body.category
			price: req.body.price
			includeInOrder: req.body.includeInOrder
			includeInPayment: req.body.includeInPayment
		}
		model.save (err) ->
			if !err
				console.log 'dish created'
			else
				console.log err
		res.send model


	update: (req, res) ->
		Dish.findById req.params.id, (err, model) ->
			model.name = req.body.name
			model.category = req.body.category
			model.price = req.body.price
			model.includeInOrder = req.body.includeInOrder
			model.includeInPayment = req.body.includeInPayment
			model.save (err) ->
				if !err
					console.log 'dish updated'
				else
					console.log err
			res.send model

	delete: (req, res) ->
		Dish.findById req.params.id, (err, model) ->
			model.remove (err) ->
				if !err
					console.log 'DIsh removed'
					res.send ''
				console.log err


module.exports = new DishController()