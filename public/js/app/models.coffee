
class Supplier extends Backbone.Model
	initialize: ->
		console.log "init model supplier"

	parse: (response) ->
		response.id = response._id
		response


class User extends Backbone.Model
	initialize: ->

	defaults:
		name: 'no name'

	parse: (response) ->
		response.id = response._id
		response


window.User = User
window.Supplier = Supplier


class UserList extends Backbone.Collection
	model: User
	url: '/users'

class SupplierList extends Backbone.Collection
	model: Supplier
	url: '/suppliers'


window.UserList = UserList
window.SupplierList = SupplierList




