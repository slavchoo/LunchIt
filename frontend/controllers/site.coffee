class SiteController
	index: (req, res) ->
    res.render "site/index", {testVar: 'fsdfsdf'}


module.exports = new SiteController()