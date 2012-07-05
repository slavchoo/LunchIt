exports.apply = (app) ->
	self = this

	acl = $.component 'acl'

	app.all '/admin*', [
		$.beforeAction,
		acl.allow 'admin'
	]

	app.all '/ajax/admin*', [
		$.beforeAction,
		acl.allow 'admin'
	]

	app.get '/admin', [
		$.controller('dashboard').index
	]