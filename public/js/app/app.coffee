_.templateSettings = {
	evaluate: /<@([\s\S]+?)@>/g,
	interpolate: /<@=([\s\S]+?)@>/g,
	escape: /<@-([\s\S]+?)@>/g
}

ViewsLiteral = {}

$ ->
	class Route extends Backbone.Router
		routes:
			"": "index"
			"!/": "index"
			"!/menu": "menu"
			"!/suppliers": "suppliers"
			"!/preferences": "preferences",
			"!/week-order": "weekOrder",
			"!/user-order": 'userOrder'
			"!/billing": 'billing'

		initialize: ->
			new AppMenuView()

		index: ->
			routes.navigate('!/week-order', {trigger: true, replace: true})

		menu: ->
			new MenuView()

		suppliers: ->
			ViewsLiteral.suppliersPageView = new SuppliersView()

		userOrder: ->
			routes.navigate('!/week-order', {trigger: true, replace: true})

		preferences: ->
			new PreferencesView()

		weekOrder: ->
			new WeekOrderView()

		billing: ->
			ViewsLiteral.BillingView = new BillingView()
			ViewsLiteral.BillingView.render()

	Views = {}
	PreferencesViews = {}

	#Main application menu
	class AppMenuView extends Backbone.View
		el: "#app-menu"
		tagName: 'li'

		initialize: ->
			ViewsLiteral.orderButtonView = new OrderButtonView()
			ViewsLiteral.orderButtonView.updateOrderStatus()

		events: ->
			"click li": "activateMenuItem"

		activateMenuItem: (e) ->
			$(@el).find(@tagName).removeClass "active"
			$(e.target).parent().addClass "active"


	class IndexView extends Backbone.View
		el: "#home-page"

		initialize: ->

		render: ->
			#$(@el).append(_.template $('#NewsContainer').html()) if !$(@el).find('#NewsContainer').length
			#$(@el).append(_.template $('#AlbumContainer').html()) if !$(@el).find('#AlbumContainer').length


	###
		Preferences view
	###
	class PreferencesSendView extends Backbone.View
		el: "#preferences-form"
		supplierContainer: '#supplier'

		initialize: ->
			ViewsLiteral.suppliersView.collection.on "reset", @render, @
			ViewsLiteral.suppliersView.on 'changeValue', @render, @

		#		destroyBind: ->
		#			ViewsLiteral.suppliersView.collection.off "reset", @render, @
		#			ViewsLiteral.suppliersView.off 'change', @render, @

		events: ->
			'click button': 'save'
			'click #add-supplier': 'addSupplier'

		render: ->
			@model = ViewsLiteral.suppliersView.getCurrent()
			if @model
				$(@el).html(_.template $('#preferences-send-template').html(), {model: @model.attributes})

			return @

		save: ->
			formData = {}
			preferencesFields = $(@el).find('input, textarea')

			_.each preferencesFields, (item) =>
				key = $(item).attr('name')
				value = $(item).val()
				formData[key] = value
			@model.save(formData)

		addSupplier: ->
			@collection.create {name: 'Лидо', address: 'lido@lido.by', cc: 'mike@gmail.com'}

	class PreferencesParamsView extends Backbone.View
		el: "#preferences-form"

		initialize: ->
			ViewsLiteral.suppliersView.collection.on "reset", @render, @
			ViewsLiteral.suppliersView.on 'changeValue', @render, @

		#		destroyBind: ->
		#			ViewsLiteral.suppliersView.collection.off "reset", @render, @
		#			ViewsLiteral.suppliersView.off 'change', @render, @

		events: ->
			'click button': 'save'

		render: ->
			@model = ViewsLiteral.suppliersView.getCurrent()
			$(@el).html(_.template $('#preferences-params-template').html(), {model: @model})
			preferencesFields = $(@el)
			if (@model)
				_.each @model.attributes, (item, key) =>
					preferencesFields.find('[name="' + key + '"]').val(item)
			return @

		save: ->
			formData = {}
			preferencesFields = $(@el).find('input, textarea')

			_.each preferencesFields, (item) =>
				key = $(item).attr('name')
				value = $(item).val()
				formData[key] = value

			@model.save(formData)

	class PreferencesTeamView extends Backbone.View
		el: "#preferences-form"

		initialize: ->
			@collection = new UserList()
			@collection.fetch()
			@render()
			@collection.on "add", @renderUser, @
			@collection.on "remove", @removeUser, @
			@collection.on "reset", @render, @

		events: ->
			"click .team-user-form .add": 'addUser'

		addUser: (e)->
			e.preventDefault()
			userNameField = $(".team-user-form").find("input.user-name")
			userName = userNameField.val()
			if !_.isEmpty(userName)

				@collection.create {name: userName}
				userNameField.val ''

		render: ->
			#render main template and than insert users list
			$(@el).html(_.template $('#preferences-team-template').html())
			_.each @collection.models, (item) =>
				@renderUser item

			return @

		renderUser: (item)->
			userView = new PreferencesUserView model: item
			$('#users-list').append(userView.render().el)

		removeUser: (removedUser) ->
			removedUsersData = removedUser.attributes

			#remove user from main array



	class PreferencesUserView extends Backbone.View
		tagName: 'li'
		template: $("#preferences-team-user-template").html(),

		events: ->
			"click .delete": "deleteUser"

		render: ->
			tmpl = _.template(@template)
			@$el.html(tmpl(@model.toJSON()))
			return @

		deleteUser: (e)->
			e.preventDefault()
			@model.destroy()
			@remove()

	#preferences page, that is container for preferences form
	class PreferencesView extends Backbone.View
		el: "#main"

		initialize: ->
			@render()
			$(@el).find('ul li:eq(0)').addClass 'active'
			#set first element selected
			#ViewsLiteral.suppliersView = new SuppliersSelectorView({el: 'div.suppliers'})
			@loadPreferences('team')

		events: ->
			'click #preferences-tabs li': 'switchTab',
			'change #supplier': 'changeSupplier'

		switchTab: (e) ->
			e.preventDefault()
			$(@el).find('li').removeClass "active"
			li = $(e.target).parent()
			li.addClass "active"
			#load form class
			@loadPreferences(li.attr "form-name")


		loadPreferences: (name) ->
			name = name + 'ParamsView'
			view = undefined
			#if (typeof(ViewsLiteral[name]) == 'undefined')
			switch name
				when 'sendParamsView' then view = new PreferencesSendView()
				when 'paramsParamsView' then view = new PreferencesParamsView()
				when 'teamParamsView' then view = new PreferencesTeamView()
			ViewsLiteral[name] = view

			if ViewsLiteral.sendParamsView
				ViewsLiteral.sendParamsView.undelegateEvents()
			if ViewsLiteral.paramsParamsView
				ViewsLiteral.paramsParamsView.undelegateEvents()

			ViewsLiteral.teamParamsView.undelegateEvents() if ViewsLiteral.teamParamsView
			ViewsLiteral[name].initialize()
			ViewsLiteral[name].delegateEvents()
			ViewsLiteral[name].render()

		render: ->
			$(@el).html(_.template $('#preferences-template').html())
			return @

		changeSupplier: ->
			@supplierId = $(@supplierContainer).val()


	class SuppliersSelectorView extends Backbone.View
		current: undefined

		initialize: ->
			@collection = new SupplierList()
			@collection.fetch()
			@collection.on 'reset', @render, @

		events: ->
			'change select': 'change'

		change: (e) ->
			@trigger 'changeValue'
			@current = $(e.target).val()

		getCurrentId: ->
			if @current
				@current
			else
				$(@el).find('select option:selected').val()

		getCurrent: ->
			@collection.get @getCurrentId()

		render: ->
			$(@el).html(_.template $('#supplier-selector-template').html(), ({suppliers: @collection.models}))
			return @

	###
	////////////////////////////
		MENU VIEWS
	////////////////////////////
	###

	class MenuView extends Backbone.View
		el: '#main'

		initialize: ->
			@collection = new DishList()
			@collection.fetch()
			@render()
			suppliers = new SuppliersSelectorView({el: 'div.suppliers'})

			@collection.on 'add', @renderDishes, @
			@collection.on 'reset', @renderDishes, @


		events: ->
			'click #add-dish': 'showDishForm'
			'click #remove-dish': 'removeDish'
			'dblclick .dish-info .view': 'inlineEdit'
			'blur .dish-info input': 'saveInlineEdit'
			'change input[type="checkbox"]': 'selectDish'

		render: ->
			$(@el).html(_.template $('#menu-template').html())
			return @

		showDishForm: (e)->
			e.preventDefault()
			new MenuDishFormView({collection: @collection})

		renderDishes: () ->
			food = new DishesMenuView collection: @collection
			accessories = new AccessorisMenuView collection: @collection
			$('#menu-dishes').html(food.render().el)
			$('#menu-accessories').html(accessories.render().el)

		inlineEdit: (e)->
			container = $(e.target).parents('.dish-info')
			modelId = container.attr('attributeId')
			model = @collection.get(modelId)
			container.find('.view').addClass('hide')
			container
				.find('.edit')
				.removeClass('hide')
				.find('input:first')
				.focus()
			_.each container.find('.edit input, .edit select'), (item) ->
				key = $(item).attr('name')
				$(item).val model.attributes[key]

		saveInlineEdit: (e) ->
			e.preventDefault()
			container = $(e.target).parents('.dish-info')

			if !$(e.target).parents('.dish-info').find('input:hover, select:hover').length
				modelId = container.attr('attributeId')
				container = $(e.target).parents('.dish-info')
				container.find('.view').removeClass('hide')
				container.find('.edit').addClass('hide')
				model = @collection.get(modelId)
				formData = {}
				_.each container.find('.edit input, .edit select'), (item) ->
					key = $(item).attr('name')
					formData[key] = $(item).val()

				model.save formData
				@collection.trigger('reset')

		selectDish: ->
			if $('input[type="checkbox"]:checked').length > 0
				$('.manage-dishes').removeAttr('id').attr('id', 'remove-dish').removeClass('btn-success').addClass('btn-danger').text('Удалить выбраные')
			else
				$('.manage-dishes').removeAttr('id').attr('id', 'add-dish').removeClass('btn-danger').addClass('btn-success').text('Добавить блюдо')

		removeDish: (e) ->
			e.preventDefault()
			_.each $('input[type="checkbox"]:checked'), (item)=>
				id = $(item).next().attr('attributeId')
				@collection.get(id).destroy()
			$('.manage-dishes').removeAttr('id').attr('id', 'add-dish').removeClass('btn-danger').addClass('btn-success').text('Добавить блюдо')
			@collection.trigger('reset')


	class DishesMenuView extends Backbone.View
		render: ->
			$(@$el).html _.template $('#menu-items-template').html(), {dishes: @collection.models, mode: 'food'}
			return @

	class AccessorisMenuView extends Backbone.View
		render: ->
			$(@$el).html _.template $('#menu-items-template').html(), {dishes: @collection.models, mode: 'accessories'}
			return @


	class MenuDishFormView extends Backbone.View
		el: '#dish-popup'

		initialize: ->
			@render()
			$('#dish-form').modal({backdrop: false})
			$('#dish-form').on 'hidden', () =>
				@hide()

		events: ->
			'click a.save': 'saveForm'

		render: ->
			$(@el).append(_.template $('#dish-form-template').html())

		saveForm: (e)->
			e.preventDefault()
			#console.log $('#dish-form').find('input, select')
			formData = {}
			_.each $('#dish-form').find('input, select'), (item) ->
				formData[$(item).attr('name')] = $(item).val()

			@collection.create(formData)
			$('#dish-form').modal('hide')

		hide: ->
			$('#dish-popup').empty()
			@undelegateEvents()


	### ///////////////////////////
		ORDER PAGES
	/////////////////////////// ###
	class WeekOrderView extends Backbone.View
		el: '#main'

		initialize: ->
			@render()
			suppliers = new SuppliersSelectorView({el: 'div.suppliers'})
			#week swetcher
			weekSwitcher = new WeekSwitcherView
			weekSwitcher.render()
			@collection = new OrderList()

		events: ->

		render: ->
			$(@el).html _.template $('#week-order-template').html()
			@


	class WeekDayOrderView extends Backbone.View
		initialize: ->
			@first = @attributes.firstDay
			@last = @attributes.lastDay
			@collection = new OrderList()
			@collection.url = '/orders/' + @first.format('YYYY-MM-DD') + '/' + @last.format('YYYY-MM-DD')
			@collection.fetch()

			@collection.on 'reset', @render, @

		render: ->
			orders = {}
			_.each @collection.models, (model) ->
				orders[moment.unix(parseInt(model.attributes.createdAt)).format('DD-MM')] = model

			day = 0
			$(@$el).html('')
			while day < 7
				currentDay = moment(@first).add('days', day)
				dayOrder = new DayOrderView({attributes: {currentDay: currentDay}, model: orders[currentDay.format('DD-MM')]})
				$(@$el).append dayOrder.render().el
				day = day + 1
			@

	class DayOrderView extends Backbone.View
		initialize: ->
			if @model
				@collection = new UserOrderList()
				@collection.url = '/user_orders/' + @model.id
				@collection.fetch()

				@collection.on 'reset', @render, @
				@collection.on 'update', @initialize, @

		render: ->
			userOrders = {}
			dayTotal = 0
			if (@collection)
				_.each @collection.models, (item) ->
					userOrders[item.attributes.user._id] = {user:{}, order: [], total: 0} if !userOrders[item.attributes.user._id]
					userOrders[item.attributes.user._id].user = item.attributes.user
					userOrders[item.attributes.user._id].order.push(item.attributes)
					userOrders[item.attributes.user._id].total += item.attributes.price * item.attributes.quantity
					dayTotal += item.attributes.price * item.attributes.quantity

			$(@$el).html _.template $('#day-order-template').html(), {currentDay: @attributes.currentDay, order: @model, userOrders: userOrders, dayTotal: dayTotal}
			@

		events: ->
			'click .add-order': 'addOrder'
			'click .user-order': 'editOrder'
			'click .preview': 'preview'

		addOrder: (e)->
			e.preventDefault()
			new OrderView({model: @model, attributes:{currentDay: @attributes.currentDay}})

		editOrder: (e) ->
			e.preventDefault()
			orderLine = $(e.target)
			if orderLine.attr('userId')
				userId = orderLine.attr('userId')
			else
				userId = orderLine.parent().attr('userId')
			new OrderView({model: @model, attributes:	{currentDay: @attributes.currentDay, userId: userId}})

		preview: (e) ->
			e.preventDefault()
			ViewsLiteral.fullOrderPopup = new FullOrderView({collection: @collection, model: @model, attributes: {currentDay: @attributes.currentDay}})
			ViewsLiteral.fullOrderPopup.render()


	class FullOrderView extends Backbone.View
		el: '#full-order-popup'
		dishCategories:
			1: 'Супы'
			2: 'Мясо'
			3: 'Гарниры'
			4: 'Салаты'
			5: 'Блины'
			6: 'Другое'
			7: 'Контейнеры'

		initialize: ->

		events: ->
			'click .save': 'save'
			'keyup input[name="price"]': 'calculateTotal'

		render: ->
			@.delegateEvents()
			fullOrderDishes = {}
			total = 0
			_.each @collection.models, (dish) ->
				fullOrderDishes[dish.attributes.dish.category] = {} if !fullOrderDishes[dish.attributes.dish.category]
				fullOrderDishes[dish.attributes.dish.category][dish.attributes.dish._id] = {} if !fullOrderDishes[dish.attributes.dish.category][dish.attributes.dish._id]
				fullOrderDishes[dish.attributes.dish.category][dish.attributes.dish._id].quantity = 0 if !fullOrderDishes[dish.attributes.dish.category][dish.attributes.dish._id].quantity

				fullOrderDishes[dish.attributes.dish.category][dish.attributes.dish._id].quantity += dish.attributes.quantity
				fullOrderDishes[dish.attributes.dish.category][dish.attributes.dish._id].name = dish.attributes.dish.name
				fullOrderDishes[dish.attributes.dish.category][dish.attributes.dish._id].price = dish.attributes.price
				fullOrderDishes[dish.attributes.dish.category][dish.attributes.dish._id].id = dish.attributes.dish._id

				total += dish.attributes.quantity * dish.attributes.price

			$(@el).html _.template $('#full-order-template').html(), {dishCategories: @dishCategories, fullOrderDishes: fullOrderDishes, date: @attributes.currentDay.format('DD MMMM'), total: total}
			$('#full-order-form').modal({backdrop: false})
			$('#full-order-form').on 'hidden', () =>
				@hide()

		save: (e) ->
			e.preventDefault()
			formData = {}
			_.each $(@el).find('input[name="price"]'), (item) ->
				formData[$(item).attr('dishId')] = $(item).val()

			@collection.url = '/orders/' + @model.id
			@collection.create(formData)
			@collection.trigger 'update'
			$('#full-order-form').modal('hide')

		hide: ->
			delete ViewsLiteral.fullOrderPopup
			@.undelegateEvents()


		calculateTotal: (e)->
			total = 0
			_.each $(@el).find('input[name="price"]'), (item) ->
				total += $(item).attr('quantity') * $(item).val()

			$(@el).find('div.total .sum').text(total)



	class WeekSwitcherView extends Backbone.View
		el: '#week-switcher'
		weekNumberFromToday: 0

		initialize: ->
			@currentDayNumber = moment().format 'd'
			@.on 'changeDate', @render, @

		events: ->
			'click .prev': 'prev'
			'click .next': 'next'
			'click .today': 'today'

		getFirstDay: ->
			if @weekNumberFromToday < 0
				moment().subtract('days', (parseInt(@currentDayNumber) - (@weekNumberFromToday * 7) - 1))
			else if @weekNumberFromToday > 0
				moment().add('days', (parseInt(@currentDayNumber) + ((@weekNumberFromToday) * 7) - 1))
			else
				moment().subtract('days', parseInt(@currentDayNumber) - 1)

		getLastDay: ->
			if @weekNumberFromToday < 0
				moment().add('days', (parseInt(7 - @currentDayNumber) - ((@weekNumberFromToday + 1) * 7) + 1))
			else if @weekNumberFromToday > 0
				moment().add('days', (parseInt(7 - @currentDayNumber) + ((@weekNumberFromToday) * 7)))
			else
				moment().add('days', parseInt(7 - @currentDayNumber))

		render: ->
			firstDay = @getFirstDay()
			lastDay = @getLastDay()

			$(@el).html _.template $('#week-switcher-template').html(), {firstDay: firstDay, lastDay: lastDay}
			@renderWeekOrder firstDay, lastDay
			@

		renderWeekOrder: (firstDay, lastDay)->
			@weekOrderView = new WeekDayOrderView({attributes:{firstDay: firstDay, lastDay: lastDay}})
			$('#week-order').html(@weekOrderView.render().el)

		prev: (e)->
			e.preventDefault()
			@weekNumberFromToday -= 1
			@trigger 'changeDate'

		next: (e)->
			e.preventDefault()
			@weekNumberFromToday += 1
			@trigger 'changeDate'

		today: (e)->
			e.preventDefault()
			@weekNumberFromToday = 0
			@trigger 'changeDate'


	class OrderView extends Backbone.View
		el: '#main'
		datepicker: '.datepicker-focus'
		copyDate: undefined

		dishCategories:
			1: 'Супы'
			2: 'Мясо'
			3: 'Гарниры'
			4: 'Салаты'
			5: 'Блины'
			6: 'Другое'
			7: 'Контейнеры'


		initialize: ->
			@users = new UserList()
			@users.fetch()

			@users.on 'reset', (usersList) =>
				@userOrder = new UserOrderList()
				if @attributes.userId && @model
					@userOrder.url = '/user_orders/' + @attributes.userId + '/' + @model.attributes.id
					@userOrder.fetch()

				@dishes = new DishList()
				@dishes.fetch()

				@render()
				@dishes.on 'reset', @render, @
				@userOrder.on 'reset', @render, @
				@.on 'updateMenu', @initialize, @

			routes.navigate("!/user-order");

		events: ->
			'click .category-dish-name': 'slideToggleMenu'

			'click .save': 'saveOrder'
			'click .copy': 'copyOrder'
			'click .cancel': 'cancelOrder'
			'click .delete': 'deleteOrder'
			'click .calendar': 'orderCalendar'

			'click .preview': 'previewOrder',
			'change select.user': 'changeUser'

		changeUser: (e) ->
			userId = $(e.target).val()
			@attributes.userId = userId
			@trigger 'updateMenu'

		slideToggleMenu: (e)->
			e.preventDefault()
			$(e.target).next().slideToggle()

		cancelOrder: (e) ->
			e.preventDefault()
			@close()

		copyOrder: (e)->
			e.preventDefault()
			copyData = {}
			_.each $(@el).find('.order .dish-order'), (item) ->
				copyData[$(item).attr('dishId')] = $(item).val()

			@.undelegateEvents()
			new OrderView({model: @potentialOrder, attributes:{currentDay: @copyDate.subtract('days', 1), copyData: copyData, userId: $(@el).find('select.user').val()}})

		orderCalendar: (e) ->
			e.preventDefault()
			$(@datepicker).focus()


		deleteOrder: (e) ->
			e.preventDefault()

			$.ajax
				url: '/user_orders/' + @attributes.userId + '/' + @model.attributes.id
				type: 'DELETE',
				dataType: 'json'
				success: =>
					@close()

		saveOrder: (e)->
			e.preventDefault()
			selectedSupplier = $('#supplier-selector').val()
			orderedDishes = []
			orderBlock = $('#main .order')
			userId = orderBlock.find('.user').val()
			_.each orderBlock.find('.dish-order'), (item) =>
				if $(item).val()
					orderedDishes.push({
						dish: $(item).attr('dishId')
						quantity: $(item).val()
						user: userId
						supplier: selectedSupplier
						order: if @model then @model.attributes.id else undefined
						date: moment(@attributes.currentDay).unix()
					})

			if orderedDishes.length
				@userOrder.url = '/user_orders/'
				@userOrder.create(orderedDishes)
			@close()

		previewOrder: (e)->
			e.preventDefault()

		render: ->
			dishesByCategory = {}
			_.each @dishes.models, (model) ->
				dishesByCategory[model.attributes.category] = [] if !dishesByCategory[model.attributes.category]
				dishesByCategory[model.attributes.category].push(model)

			userOrder = {}
			if @userOrder
				_.each @userOrder.models, (userOrderModel) =>
					userOrder[userOrderModel.attributes.dish] = [] if !userOrder[userOrderModel.attributes.dish]
					userOrder[userOrderModel.attributes.dish] = userOrderModel.attributes

			copyUserOrder = undefined
			if @attributes.copyData
				copyUserOrder = {}
				_.each @attributes.copyData, (item, dishId) =>
					copyUserOrder[dishId] = @attributes.copyData[dishId]

			$(@el).html _.template $('#order-template').html(), {model: @model, copyUserOrder: copyUserOrder, dishesByCategory: dishesByCategory, currentDay: @attributes.currentDay, dishCategories: @dishCategories, users: @users, userOrder: userOrder}
			if @attributes.userId
				$('#main .order .user').val(@attributes.userId)

			$(@datepicker).val(moment(@attributes.currentDay).add('days', 1).format('MM/DD/YYYY'))

			@setDatepickerEvents()
			@

		setDatepickerEvents: ->
			@getPotentialCopyDay(moment(@attributes.currentDay).add('days', 1))
			$('.order .control-buttons .copy').text('Копировать на завтра')
			$(@datepicker).datepicker
				dateFormat: "mm/dd/yy"
				onSelect: (dateText, inst) =>
					@getPotentialCopyDay(dateText)

		getPotentialCopyDay: (dateText)->
			@copyDate = moment(dateText)
			$('.order .control-buttons .copy').text('Копировать на ' + @copyDate.format('DD MMMM'))
			@potentialCopyDay = new OrderList()
			@potentialCopyDay.url = '/orders/' + @copyDate.format('YYYY-MM-DD') + '/' + @copyDate.add('days', 1).format('YYYY-MM-DD')
			@potentialCopyDay.fetch()
			@potentialCopyDay.on 'reset', (order) =>
				@potentialOrder = order.models[0]

		close: ->
			@.undelegateEvents()
			new WeekOrderView()

	class SuppliersView extends Backbone.View
		el: "#main"

		initialize: ->
			@updateSuppliers()

		updateSuppliers: ->
			@collection = new SupplierList()
			@collection.fetch()
			@collection.on 'reset', @render, @

		events: ->
			'click .add': 'addSupplier'

		addSupplier: (e) ->
			e.preventDefault()
			new EditSupplierView({collection: @collection, model: @model})

		render: ->
			$(@el).html _.template $('#suppliers-template').html()
			if @collection.models.length
				_.each @collection.models, (item)=>
					@renderSupplier item, @collection
			else
				$('.suppliers-list').html('<h2>Hи одного поставщика не добавлено</h2>')
			$('.suppliers-list a.add').show()

		renderSupplier: (model, collection)->
			supplierView = new SupplierView model: model, collection: collection
			$('.suppliers-list ul').append supplierView.render().el

	class EditSupplierView extends Backbone.View
		el: '.supplier-form'

		initialize: ->
			@render()

		events: ->
			'click button': 'save'

		render: ->
			$('.suppliers-list ul').empty()
			$('.suppliers-list a.add').hide()
			$(@el).html _.template $('#supplier-form-template').html()
			container = $(@el)
			if @model
				_.each @model.attributes, (item, key) ->
					container.find('[name="' + key + '"]').val(item)

		save: ->
			formData = {}
			_.each $(@el).find('input, select, textarea'), (item) ->
				formData[$(item).attr('name')] = $(item).val()
			if !@model
				@model = new Supplier(formData)
				@collection.create @model
			else
				@model.save formData
			@remove()

			ViewsLiteral.suppliersPageView.updateSuppliers()

	class SupplierView extends Backbone.View
		tagName: 'li'
		events: ->
			'click .edit': 'edit'

		edit: (e) ->
			e.preventDefault()
			new EditSupplierView({model: @model})

		render: ->
			$(@$el).html _.template $('#supplier-template').html(), @model.attributes
			@


	class OrderButtonView extends Backbone.View
		buttonSelector: 'header .order-button a'
		el: '.order-button'

		initialize: ->

		events: ->
			'click a': 'showPreview'

		getLastOrder: ->
			lastOrder = {}
			_.each @collection.models, (model) ->
				lastOrder = model.attributes
			@lastOrder = lastOrder
			@changeButtonStatus(lastOrder)
			@.trigger 'saveOrder'

		showPreview: (e) ->
			e.preventDefault()
			@.on 'saveOrder', @loadPopup, @
			@updateOrderStatus()

		loadPopup: ->
			console.log 'load popup'
			ViewsLiteral.previewEmail = new PreviewEmailView({model: @lastOrder})
			ViewsLiteral.previewEmail.on 'sent', @saveOrder, @
			@.off 'saveOrder'

		saveOrder: ->
			if @lastOrder
				$.ajax
					url: '/send_order/' + @lastOrder.id
					data:
						text: ViewsLiteral.previewEmail.emailText
					type: 'POST'
					dataType: 'text'
					success: (response) =>
						console.log 'update status'
						@updateOrderStatus()
			@.off 'saveOrder'

		updateOrderStatus: ->
			@collection = new OrderList()
			@collection.getTodayOrder()
			@collection.on 'reset', @getLastOrder, @

		render: ->
			#$()

		changeButtonStatus: (order) ->
			if order.sentAt == undefined
				$(@buttonSelector).removeClass('btn-warning').addClass('btn-success').text('Отправить заказ')
			else
				$(@buttonSelector).removeClass('btn-success').addClass('btn-warning').text('Заказ отправлен')


	class PreviewEmailView extends Backbone.View
		el: '#preview-email'

		initialize: ->
			@.on 'loadPopup', @render, @
			$.ajax
				url: '/order_preview/' + @model.id
				type: 'GET'
				dataType: 'text'
				success: (response) =>
					@emailText = response
					@.trigger 'loadPopup'


		events: ->
			'click a.save': 'save'

		save: (e)->
			e.preventDefault()
			@emailText = $(@el).find('textarea').val()
			@.trigger 'sent'
			$('#preview-order-form').modal('hide')
			$(ViewsLiteral.orderButtonView.buttonSelector).addClass('btn-success').text('Заказ отправляется...')

		render: ->
			$(@el).html _.template $('#preview-email-template').html(), {date: moment().format('DD MMMM'), text: @emailText}
			$('#preview-order-form').modal({backdrop: false})
			$('#preview-order-form').on 'hidden', () =>
				@hide()

		hide: ->
			ViewsLiteral.previewEmail.off 'sent'
			$(@el).empty()
			@.undelegateEvents()



	### ////////////////////////////////////////////////
		Billing
	//////////////////////////////////////////////// ###
	class BillingView extends  Backbone.View
		el: '#main'

		initialize: ->
			@orders = new OrderList()
			@unpaid = new UserDayOrderList()

			@users = new UserList()
			@users.fetch()

			@users.on 'reset', (users) =>
				@orders.getOrderByDate(moment())
				@orders.on 'reset', (result) =>
					@order = @orders.models[0] #@orders.models[0] mongoose return one field, but fetch() - many
					@renderPayer()
					@updateUnpaid()

			@currentDate = moment()

		events: ->
			'click #unpaid-users button.save': 'savePayment'
			'change #unpaid-users input[type="checkbox"]': 'recalculateTotal'
			'click #payer .pay': 'attachUser'
			'change #payer .payer-name select': 'updateUnpaid'
			'click #payer div.calendar a': 'showCalendar'

		showCalendar: (e) ->
			e.preventDefault()
			$('#payer input.calendar').focus()

		attachUser: (e)->
			e.preventDefault()
			userId = $('#payer .payer-name select').val()
			if !_.isEmpty(userId)
				@orders.url = '/orders'
				@order.save({payer: userId})
				@updateUnpaid()

		recalculateTotal: ->
			checkboxes = $('#unpaid-users input[type="checkbox"]')
			total = 0
			_.each checkboxes, (item) ->
				if $(item).is(':checked')
					total += parseInt($(item).attr('total'))
			checkboxes.parents('.user').find('.name .total .paid').text(total)

		updateUnpaid: ->
			console.log @order
			@unpaid.getUnpaid($('#payer .payer-name select').val())
			@unpaid.on 'reset', @renderUsers, @

		savePayment: (e)->
			e.preventDefault()
			paid = []
			_.each $('#unpaid-users .user input[type="checkbox"]:checked'), (item) ->
				paid.push($(item).parents('div.day').attr('orderId'))
			@unpaid.on 'sync', @updateUnpaid, @
			@unpaid.url = '/user_day_orders'
			@unpaid.create paid

		renderPayer: ->
			$(@el).find('#payer').html _.template $('#payer-template').html(), {users: @users.models, orders: @order, date: @currentDate}
			$('#payer input[type="hidden"]').datepicker({
				onSelect: (date)=>
					dateObject = moment(date)
					@orders.getOrderByDate(dateObject)
					@currentDate = dateObject
					$('#payer .calendar a').text(dateObject.format('DD MMMM'))
			})

		renderUsers: ->
			unpaidUsers = {}
			_.each @unpaid.models, (user) ->
				unpaidUsers[user.attributes.user._id] = [] if !unpaidUsers[user.attributes.user._id]
				unpaidUsers[user.attributes.user._id].total = 0 if !unpaidUsers[user.attributes.user._id].total
				unpaidUsers[user.attributes.user._id].push user
				unpaidUsers[user.attributes.user._id].total += user.attributes.order.total

			$(@el).find('#unpaid-users').html _.template $('#unpaid-users-template').html(), {unpaid: unpaidUsers, users: @users}

		render: ->
			$(@el).html _.template $('#billing-page-template').html()
			@


	routes = new Route()
	Backbone.history.start()


#_.templateSettings = {
#	evaluate    : /<@([\s\S]+?)@>/g,
#	interpolate : /<@=([\s\S]+?)@>/g,
#	escape      : /<@-([\s\S]+?)@>/g
#};
#
#$ ->
#	class Controller extends Backbone.Router
#		routes:
#			"" : "index"
#			"!/": "index"
#			"!/news": "news"
#			"!/music": "music"
#			"!/video": "video"
#			"!/artists": "artists"
#			"!/post/:id": "showPost"
#
#		index: ->
#			Views.page.render() if Views.page?
#
#		news: ->
#			console.log "news"
#
#		music: ->
#			console.log "music"
#
#		video: ->
#			console.log "videos"
#
#		artists: ->
#			console.log "artists"
#
#		showPost: (id)->
#			if Views.postPage?
#				post = new Post {_id: id}
#				Views.postPage.setModel post
#				post.fetch()
#
#
#	AppState =
#		username : ""
#
#
#	Views = {}
#
#	class SitePage extends Backbone.View
#		el: $ "#mainContainer"
#
#		posts: []
#		albums: []
#
#		events: {}
#
#		constructor: ->
#			@posts = new PostCollection()
#			@posts.bind 'add', @addPost, @
#			@posts.bind 'all', @addAllPosts, @
#
#			@albums = new AlbumCollection()
#			@albums.bind 'add', @addAlbum, @
#			@albums.bind 'all', @addAllAlbums, @
#
#		render: ->
#			@posts.fetch()
#			@albums.fetch()
#			$(@el).empty()
#			$(@el).append(_.template $('#NewsContainer').html()) if !$(@el).find('#NewsContainer').length
#			$(@el).append(_.template $('#AlbumContainer').html()) if !$(@el).find('#AlbumContainer').length
#
#		addPost: (post)->
#			view = new PostView
#				model: post
#
#			container = $(@el).find('.news')
#			container.append view.render().el
#
#		addAllPosts: ->
#			@posts.each @addPost, @
#
#		addAlbum: (album)->
#			view = new AlbumView
#				model: album
#
#			container = $(@el).find('.albums')
#			container.append view.render().el
#
#		addAllAlbums: ->
#			@albums.each @addAlbum, @
#
#	class PostPage extends Backbone.View
#		el: $ "#mainContainer"
#		template: $ "#PostFull"
#
#		post: {}
#
#		constructor: () ->
#
#		render: () ->
#			console.log @post.toJSON()
#			$(@el).html _.template @template.html(), @post.toJSON()
#
#		setModel: (model) ->
#			@post = model
#			@post.bind 'change', @render, @
#
#
#	class PostView extends Backbone.View
#		tagName: "div"
#		className: "span4 blog"
#		template:	$ "#PostView"
#
#		events:
#			"click .view-post": 'displayPost'
#
#		displayPost: (e) ->
#			controller.navigate "!/post/#{@model.get '_id'}", true
#			return false_.each @model, (item)
#
#		render: ->
#			@$el.html _.template @template.html(), @model.toJSON()
#			return @
#
#	class AlbumView extends Backbone.View
#		tagName: 'div'
#		className: 'span4 blog'
#		template: _.template "fff"
#
#		render: ->
#			@$el.html @template()
#			return @
#
#	Views =
#		page: new SitePage()
#		postPage:new PostPage()
#
#	controller = new Controller()
#	Backbone.history.start()
#
