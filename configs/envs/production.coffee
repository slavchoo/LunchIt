express = require 'express'
MongoStore = require 'connect-mongodb'
Db = require('mongodb').Db
Server = require('mongodb').Server
mongoose = require 'mongoose'

exports.apply = (app)->
	app.configure 'production', ->
	app.use express.errorHandler {
		dumpExceptions: true,
		showStack: true
	}

	app.use express.session {
		secret: "lunchIt_secred_Wdi78",
		store: new MongoStore({
		db: new Db('lunchIt_session',
			new Server('192.168.1.100', 27017, {
				auto_reconnect: true,
				native_parser: true
			})
			, {})
		})
	}

	mongoose.connect('mongodb://192.168.1.100/lunchIt', (err)->
		if err
			console.error 'Can not connect to database'
			throw err;

	console.info 'Successfully connected to database'
	)

	app.set 'port', 8000
	app.set 'view cache', false

