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
		}
		supplier.save (err) ->
			if !err
				console.log 'created'
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