class SupplierController
	list: (req, res) ->
		Supplier.find (err, suppliers) ->
			if !err
				res.send suppliers
			else
				console.log err

	create: (req, res) ->
		supplier = new Supplier {
			name: req.body.name
			address: req.body.address
			cc: req.body.cc
			subject: req.body.subject
			template: req.body.template
			min_order: req.body.min_order
		}
		supplier.save (err) ->
			if !err
				console.log 'created'
			else
				console.log err
		res.send supplier


	update: (req, res) ->
		Supplier.findById req.params.id, (err, supplier) ->
			supplier.name = req.body.name
			supplier.address = req.body.address
			supplier.cc = req.body.cc
			supplier.subject = req.body.subject
			supplier.template = req.body.template
			supplier.min_order = req.body.min_order
			supplier.save (err) ->
				if !err
					console.log 'Supplier updated'
				else
					console.log err
				res.send supplier

	delete: (req, res) ->
		console.log req.params.id
		Supplier.findById req.params.id, (err, supplier) ->
			supplier.remove (err) ->
				if !err
					console.log 'Supplier removed'
					res.send ''
				console.log err


module.exports = new SupplierController()