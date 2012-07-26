express = require 'express'
ejs = require 'ejs'
app = module.exports = express.createServer()
coffeescript = require 'coffee-script'
log4js = require 'log4js'

# load models
require './models/user'
require './models/supplier'
require './models/dish'
require './models/order'
require './models/user_order'
require './models/user_day_order'
require './models/dish_category'

app.path =  path = require 'path'
app.jsHandler  = jsHandler = ""
app.crypto = crypto = require 'crypto'

app.configure ->
	publicDir = "#{__dirname}/public"
	viewsDir  = "#{__dirname}/views"
	coffeeDir = "#{publicDir}/coffeescript" #@todo check for needing

	app.use express.bodyParser {
		uploadDir: './files'
	}

	app.use express.methodOverride()
	app.use express.cookieParser()

	app.set "views", viewsDir
	app.register '.html', ejs
	app.set "view engine", 'html'
	app.use app.router
	app.use express.compiler({
		src: publicDir
		enable: ['coffeescript']
	})
	app.use express.static publicDir


require('./configs/envs/production').apply app
#require('./configs/envs/development').apply app

app.dynamicHelpers {
	session: (req, res)->
		return req.session
}

require('./configs/bootstrap').apply app
require('./frontend/configs/bootstrap').apply app
require('./admin/configs/bootstrap').apply app

#app.get '*', (req, res)->
#	throw new NotFound()

app.listen 8000
#console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env
