
class Supplier extends Backbone.Model
	initialize: ->
		console.log "init model supplier"

	parse: (response) ->
		response.id = response._id
		response


class User extends Backbone.Model
	initialize: ->

	parse: (response) ->
		response.id = response._id
		response

class Dish extends Backbone.Model
	initialize: ->

	parse: (response) ->
		response.id = response._id
		response

window.User = User
window.Supplier = Supplier
window.Dish = Dish


class UserList extends Backbone.Collection
	model: User
	url: '/users'

class SupplierList extends Backbone.Collection
	model: Supplier
	url: '/suppliers'

class DishList extends Backbone.Collection
	model: Dish
	url: '/dishes'


window.UserList = UserList
window.SupplierList = SupplierList
window.DishList = DishList




