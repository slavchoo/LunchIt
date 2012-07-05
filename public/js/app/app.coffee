_.templateSettings = {
	evaluate    : /<@([\s\S]+?)@>/g,
	interpolate : /<@=([\s\S]+?)@>/g,
	escape      : /<@-([\s\S]+?)@>/g
};

$ ->
	class Controller extends Backbone.Router
		routes:
			"" : "index"
			"!/": "index"
			"!/news": "news"
			"!/music": "music"
			"!/video": "video"
			"!/artists": "artists"
			"!/post/:id": "showPost"

		index: ->
			Views.page.render() if Views.page?

		news: ->
			console.log "news"

		music: ->
			console.log "music"

		video: ->
			console.log "videos"

		artists: ->
			console.log "artists"

		showPost: (id)->
			if Views.postPage?
				post = new Post {_id: id}
				Views.postPage.setModel post
				post.fetch()


	AppState =
		username : ""


	Views = {}

	class SitePage extends Backbone.View
		el: $ "#mainContainer"

		posts: []
		albums: []

		events: {}

		constructor: ->
			@posts = new PostCollection()
			@posts.bind 'add', @addPost, @
			@posts.bind 'all', @addAllPosts, @

			@albums = new AlbumCollection()
			@albums.bind 'add', @addAlbum, @
			@albums.bind 'all', @addAllAlbums, @

		render: ->
			@posts.fetch()
			@albums.fetch()
			$(@el).empty()
			$(@el).append(_.template $('#NewsContainer').html()) if !$(@el).find('#NewsContainer').length
			$(@el).append(_.template $('#AlbumContainer').html()) if !$(@el).find('#AlbumContainer').length

		addPost: (post)->
			view = new PostView
				model: post

			container = $(@el).find('.news')
			container.append view.render().el

		addAllPosts: ->
			@posts.each @addPost, @

		addAlbum: (album)->
			view = new AlbumView
				model: album

			container = $(@el).find('.albums')
			container.append view.render().el

		addAllAlbums: ->
			@albums.each @addAlbum, @

	class PostPage extends Backbone.View
		el: $ "#mainContainer"
		template: $ "#PostFull"

		post: {}

		constructor: () ->

		render: () ->
			console.log @post.toJSON()
			$(@el).html _.template @template.html(), @post.toJSON()

		setModel: (model) ->
			@post = model
			@post.bind 'change', @render, @


	class PostView extends Backbone.View
		tagName: "div"
		className: "span4 blog"
		template:	$ "#PostView"

		events:
			"click .view-post": 'displayPost'

		displayPost: (e) ->
			controller.navigate "!/post/#{@model.get '_id'}", true
			return false

		render: ->
			@$el.html _.template @template.html(), @model.toJSON()
			return @

	class AlbumView extends Backbone.View
		tagName: 'div'
		className: 'span4 blog'
		template: _.template $("#AlbumView").html()

		render: ->
			@$el.html @template()
			return @

	Views =
		page: new SitePage()
		postPage:new PostPage()

	controller = new Controller()
	Backbone.history.start()

