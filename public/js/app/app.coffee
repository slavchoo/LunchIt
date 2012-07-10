_.templateSettings = {
	evaluate    : /<@([\s\S]+?)@>/g,
	interpolate : /<@=([\s\S]+?)@>/g,
	escape      : /<@-([\s\S]+?)@>/g
};

$ ->

	usersData = [{'name': 'John Doe'}, {'name': 'Chris Wonder'}]

	suppliersData = [{
			id: 23
			name: 'Лидо'
			address: 'lido@lido.by'
			cc: 'lido2@lido.by'
			subject: 'mail subject'
			template: 'template mail mail template'
			min_order: 120000
		},
		{
			id: 35
			name: 'Пивнуха'
			address: '1lido@lido.by'
			cc: '1lido2@lido.by'
			subject: '1mail subject'
			template: '1template mail mail template'
			min_order: 100000
		}]



	class Route extends Backbone.Router
		routes:
			"" : "index"
			"!/": "index"
			"!/menu": "menu"
			"!/suppliers": "supplier"
			"!/preferences": "preferences",
			"!/order": "order",

		initialize: ->
			new AppMenuView()

		index: ->
			new IndexView()

		menu: ->
			#new MenuPage()

		suppliers: ->
			#new SuppliersPage()

		preferences: ->
			new PreferencesView()

		order: ->
			#new OrderPage()

	Views = {}

	#Main application menu
	class AppMenuView extends Backbone.View
		el: "#app-menu"
		tagName: 'li'

		events: ->
			"click li" : "activateMenuItem" #add tagName variable instead of using tag li

		activateMenuItem: (e) ->
			$(@el).find(@tagName).removeClass "active" #need more right solution
			$(e.target).parent().addClass "active"



	class IndexView extends Backbone.View
		el: "#home-page"

		initialize: ->
			console.log "index"

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

			@collection = new SupplierList()
			@collection.fetch()
			@supplierId = $(@supplierContainer).val()


			@render()





			@collection.on "reset", @render, @

		events: ->
			'click button': 'save'
			'click #add-supplier': 'addSupplier'

		render: ->
			@model = @collection.get('4ffc462b7293dd8c12000001')
			$(@el).html(_.template $('#preferences-send-template').html())
			preferencesFields = $(@el)
			if @model
				_.each @model.attributes, (item, key) =>
					preferencesFields.find('[name="' + key + '"]').val(item)
			return @

		save: ->
			formData = []
			preferencesFields = $(@el).find('input, textarea')
			supplierData = {}
			_.each suppliersData, (item)=>
				if item.id == @model.id
					supplierData = item


			suppliersData = _.map preferencesFields, (item) =>
				key = $(item).attr('name')
				value = $(item).val()
				formData[key] = value
				supplierData[key] = value


			@model.set(formData)

		addSupplier: ->
			@collection.create {name: 'Лидо', address: 'lido@lido.by', cc: 'mike@gmail.com'}

	class PreferencesParamsView extends Backbone.View
		el: "#preferences-form .params"

		initialize: ->
			@render()

		events: ->
			'click button': 'save'

		render: ->
			$(@el).html(_.template $('#preferences-params-template').html())
			preferencesFields = $(@el)
			_.each @model.attributes, (item, key) =>
				preferencesFields.find('[name="' + key + '"]').val(item)
			return @

		save: ->
			formData = []
			preferencesFields = $(@el).find('input, textarea')
			supplierData = {}
			_.each suppliersData, (item)=>
				if item.id == @model.id
					supplierData = item


			suppliersData = _.map preferencesFields, (item) =>
				key = $(item).attr('name')
				value = $(item).val()
				formData[key] = value
				supplierData[key] = value


			@model.set(formData)

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
				usersData.push {name: userName}
				@collection.create {name: userName}
				userNameField.val ''

		render: ->
			#render main template and than insert users list
			$(@el).html(_.template $('#preferences-team-template').html())
			_.each @collection.models, (item) =>
				@renderUser item

			return @

		renderUser: (item)->
			userView = new PreferencesUserView model:item
			$('#users-list').append(userView.render().el)

		removeUser: (removedUser) ->
			removedUsersData = removedUser.attributes

			#remove user from main array
			_.each usersData, (user) =>
				if _.isEqual user, removedUsersData
					usersData.splice _.indexOf(usersData, user), 1;




	class PreferencesUserView extends Backbone.View
		tagName: 'li'
		template: $("#preferences-team-user-template").html(),

		events: ->
			"click .delete": "deleteUser"

		render: ->
			tmpl = _.template(@template);
			@$el.html(tmpl(@model.toJSON()));
			return @

		deleteUser: (e)->
			e.preventDefault()
			@model.destroy()
			@remove()





	#preferences page, that is container for preferences form
	class PreferencesView extends Backbone.View
		el: "#preferences"
		supplierId: undefined

		initialize: ->
			@render()
			$(@el).find('ul li:eq(0)').addClass 'active' #set first element selected
			@loadPreferences('send')

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

			switch name
				when 'send' then new PreferencesSendView()
				when 'params' then new PreferencesParamsView()
				when 'team' then new PreferencesTeamView()

		render: ->
			$(@el).html(_.template $('#preferences-template').html())
			return @

		changeSupplier: ->
			@supplierId = $(@supplierContainer).val()


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
#			return false
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
