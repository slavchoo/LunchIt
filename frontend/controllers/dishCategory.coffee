class DishCategoryController
	getBySupplier: (req, res) ->
		DishCategory.find({supplier: req.params.id}).sort('createdAt', 1).exec (err, models) ->
			if !err
				res.send models
			else
				console.log err

	create: (req, res) ->
		model = new DishCategory {
			name: req.body.name
			supplier: req.body.supplier
			includeInOrder: req.body.includeInOrder
		}
		model.save (err) ->
			if !err
				res.send model
			else
				console.log err

	update: (req, res) ->
		DishCategory.findById req.params.id, (err, model) ->
			model.name = req.body.name
			model.supplier = req.body.supplier
			model.includeInOrder = req.body.includeInOrder
			model.save (err) ->
				if !err
					res.send model
				else
					console.log err

	delete: (req, res) ->
		DishCategory.findById req.params.id, (err, model) ->
			model.remove (err) ->
				if !err
					res.send ''
				else
					console.log err

module.exports = new DishCategoryController()