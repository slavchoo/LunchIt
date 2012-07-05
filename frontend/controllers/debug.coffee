class DebugController
	index: (req, res) ->
		Post.remove {}, (err) ->
			console.log err

		post = new Post()
		post.set
			title: "First Post"
			content: "First Post Content"
		post.save (err) ->
			res.send "ok!"


module.exports = new DebugController()