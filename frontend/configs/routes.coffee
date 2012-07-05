exports.apply = (app) ->
	self = this

	acl = $.component 'acl'

	app.get '/', [
		$.beforeAction,
		$.controller('site').index
	]
