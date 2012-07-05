require '../module'

exports.apply = (app)->
	require('./routes').apply app
