path = require 'path'

global.$ = {
	controller: (name)->
		return require './controllers/'+name

	ajax: (name)->
		return require './ajax/' + name

	config: (name)->
		if path.existsSync './configs/ ' + name + '.js'
			return require './configs/' + name

		return require '../configs/' + name

	lib: (name)->
		if path.existsSync './lib/ ' + name + '.js'
			return require './lib/' + name

		return require '../lib/' + name


	component: (name)->
		if  path.existsSync './components/ ' + name + '.js'
			return require('./components/' + name).create()

		return require('../components/' + name).create()

	beforeAction: (req, res, next)->
		req.app.set 'views', __dirname + '/views'
		req.app.locals {
			req: req,
			title: null
		}
		next()

}