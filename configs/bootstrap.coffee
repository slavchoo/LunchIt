require './errors'

exports.apply = (app)->
	require('./routes').apply(app)