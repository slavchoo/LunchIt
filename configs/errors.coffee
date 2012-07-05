NotFound = (msg)->
	this.name = 'NotFound'
	Error.call this, msg
	Error.captureStackTrace this, arguments.callee

NotFound.prototype.__proto__ = Error.prototype

PermissionDenied = (msg)->
	this.name = 'PermissionDenied'
	Error.call this, msg
	Error.captureStackTrace this, arguments.callee

PermissionDenied.prototype.__proto__ = Error.prototype;

AccountNotActivate = (msg)->
	this.name = 'AccountNotActivate'
	Error.call this, msg
	Error.captureStackTrace this, arguments.callee

AccountNotActivate.prototype.__proto__ = Error.prototype;

global.NotFound = NotFound;
global.PermissionDenied = PermissionDenied;
global.AccountNotActivate = AccountNotActivate;