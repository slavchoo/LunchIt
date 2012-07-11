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

	app.put '/suppliers/:id', [
		$.beforeAction
		$.controller('supplier').update
	]

	app.post '/suppliers', [
		$.beforeAction
		$.controller('supplier').create
	]

	app.get '/dishes', [
		$.beforeAction
		$.controller('dish').list
	]

	app.put '/dishes/:id', [
		$.beforeAction
		$.controller('dish').update
	]

	app.post '/dishes', [
		$.beforeAction
		$.controller('dish').create
	]

	app.delete '/dishes/:id', [
		$.beforeAction
		$.controller('dish').delete
	]
