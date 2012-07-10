exports.apply = (app) ->
	self = this

	acl = $.component 'acl'

	app.get '/', [
		$.beforeAction,
		$.controller('site').index
	]

	app.get '/users', [
		$.beforeAction
		$.controller('user').list
	]

	app.post '/users', [
		$.beforeAction
		$.controller('user').create
	]

	app.delete '/users/:id', [
		$.beforeAction
		$.controller('user').delete
	]

	app.get '/suppliers', [
		$.beforeAction
		$.controller('supplier').list
	]

	app.post '/suppliers/:id', [
		$.beforeAction
		$.controller('supplier').update
	]

	app.post '/suppliers', [
		$.beforeAction
		$.controller('supplier').create
	]
