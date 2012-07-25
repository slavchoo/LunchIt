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
		response.id = response._id
		response

class UserOrder extends Backbone.Model
	parse: (response) ->
		response.id = response._id
		response

class UserDayOrder extends Backbone.Model
	idAttribute: "_id"

window.User = User
window.Supplier = Supplier
window.Dish = Dish
window.UserOrder = UserOrder
window.UserDayOrder = UserDayOrder


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

	getTodayOrder: ->
		fromDay = moment().format('YYYY-MM-DD')
		@.url = '/orders/' + fromDay + '/' + moment().add('days', 1).format('YYYY-MM-DD')
		@.fetch()

	getOrderByDate: (date) ->
		if _.isObject(date)
			dateObject = date
		else
			dateObject = moment(date)
		@.url = '/day_order/' + dateObject.format('YYYY-MM-DD')
		@.fetch()


class UserOrderList extends Backbone.Collection
	model: UserOrder
	url: '/user_orders'

class UserDayOrderList extends Backbone.Collection
	model: UserDayOrder
	url: '/user_day_orders'

	getUnpaid: (user)->
		if user
			@.url = '/unpaid_orders/' + user
		else
			@.url = '/unpaid_orders'
		@.fetch()



window.UserList = UserList
window.SupplierList = SupplierList
window.DishList = DishList
window.OrderList = OrderList
window.UserOrderList = UserOrderList
window.UserDayOrderList = UserDayOrderList




