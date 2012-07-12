
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

	getCategory: (item)->
		@attributes.category

class Order extends Backbone.Model
	parse: (response) ->
		console.log response
		response.id = response._id
		response

class UserOrder extends Backbone.Model
	parse: (response) ->
		response.id = response._id
		response




window.User = User
window.Supplier = Supplier
window.Dish = Dish
window.UserOrder = UserOrder


class UserList extends Backbone.Collection
	model: User
	url: '/users'

class SupplierList extends Backbone.Collection
	model: Supplier
	url: '/suppliers'

class DishList extends Backbone.Collection
	model: Dish
	url: '/dishes'

class OrderList extends Backbone.Collection
	model: Order
	url: '/orders'

class UserOrderList extends Backbone.Collection
	model: UserOrder
	url: '/user_orders'




window.UserList = UserList
window.SupplierList = SupplierList
window.DishList = DishList
window.OrderList = OrderList
window.UserOrderList = UserOrderList




