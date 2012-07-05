class SiteController
	index: (req, res)->
		res.render "site/index", {}

module.exports = new SiteController()