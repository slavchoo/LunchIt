_.templateSettings = {
	evaluate    : /<@([\s\S]+?)@>/g,
	interpolate : /<@=([\s\S]+?)@>/g,
	escape      : /<@-([\s\S]+?)@>/g
};

$ ->
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


	class PreferencesSendView extends Backbone.View
		el: "#preferences-form"

		initialize: ->
			@render()

		render: ->
			$(@el).html(_.template $('#preferences-send-template').html())
			return @

	class PreferencesParamsView extends Backbone.View
		el: "#preferences-form"

		initialize: ->
			@render()

		render: ->
			$(@el).html(_.template $('#preferences-send-template').html())
			return @

	class PreferencesTeamView extends Backbone.View
		el: "#preferences-form"

		initialize: ->
			@render()

		render: ->
			$(@el).html(_.template $('#preferences-send-template').html())
			return @


	#preferences page, that is container for preferences form
	class PreferencesView extends Backbone.View
		el: "#preferences"
		supplierId: undefined

		initialize: ->
			@render()
			$(@el).find('ul li:eq(0)').addClass 'active' #set first element selected
			@loadPreferences('send')

		events: ->
			'click #preferences-tabs li': 'switchTab'

		switchTab: (e) ->
			$(@el).find('li').removeClass "active"
			li = $(e.target).parent()
			li.addClass "active"
			#load form class
			@loadPreferences(li.attr "form-name")


		loadPreferences: (name) ->
			preferencesViews =
				send: new PreferencesSendView()
				parameters: new PreferencesParamsView()
				team: new PreferencesTeamView()
			preferencesViews[name]


		render: ->
			$(@el).html(_.template $('#preferences-template').html())
			return @

		remove: ->
			console.log "remove"

		clear: ->
			console.log "clear"




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
