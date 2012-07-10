class UserController
	list: (req, res) ->
		User.find (err, users) ->
			if !err
				res.send users
			else
				console.log err

	create: (req, res) ->
		user = new User {
			name: req.body.name
		}
		user.save (err) ->
			if !err
				console.log 'created'
			else
				console.log err
		res.send user

	delete: (req, res) ->
		User.findById req.params.id, (err, user) ->
			user.remove (err) ->
				if !err
					console.log 'User removed'
					res.send ''
				console.log err


module.exports = new UserController()