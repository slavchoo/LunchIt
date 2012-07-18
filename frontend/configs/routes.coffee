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

	app.get '/orders/:from/:to', [
		$.beforeAction
		$.controller('order').list
	]

	app.post '/orders', [
		$.beforeAction
		$.controller('order').create
	]

	app.post '/orders/:id', [
		$.beforeAction
		$.controller('order').updateOrder
	]

	#get all dishes from one order
	app.get '/user_orders/:id', [
		$.beforeAction
		$.controller('userOrder').orderDishes
	]

	#get all dishes for one order and one user. For edit
	app.get '/user_orders/:userId/:orderId', [
		$.beforeAction
		$.controller('userOrder').userOrder
	]

	app.put '/user_orders/:id', [
		$.beforeAction
		$.controller('userOrder').update
	]

	app.post '/user_orders', [
		$.beforeAction
		$.controller('userOrder').create
	]

	app.delete '/user_orders/:id', [
		$.beforeAction
		$.controller('userOrder').delete
	]
