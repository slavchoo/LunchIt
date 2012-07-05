acl =
	auth: (UserModel)->
		return (req, res, next)->
			if req.session.user._id
				UserModel.findOne {
					_id: req.session.user._id
				},
				(err, user)->
					if !err
						req.user = user
					next()
			else
				req.user = {}
				next()

	allow: (role)->
		return (req, res, next)->
			if role == "*"
				next()
				return true

			if !req.session.user
				res.redirect '/user/login'
				return false

			if req.session.user._id
				User.findById req.session.user._id, (err, user)->
					if !err && (role.indexOf(user.role) > -1)
						req.user = user
						next()
					else
						next new PermissionDenied()
			else
				req.user = {}
				res.redirect '/user/login'

exports.acl = acl
exports.create = ->
	return acl