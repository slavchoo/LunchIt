exports.apply = (app)->
	self = this;

	app.error (err, req, res, next)->
		req.app.set 'views', __dirname + '/../frontend/views'
#		if err instanceof NotFound
#			res.render '404.html', {}
#		else if err instanceof PermissionDenied
#			res.renderc'404.html', {}
#		else
#			res.renderc'404.html', {}

		res.render '404.html',{
				title: 'La Belle Assiette| Page Not Found'
		}
#		console.log(err);