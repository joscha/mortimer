// Mortimer.js - entry point and configuration utility

/*
	usage:

	var express = require('express');
	var Mortimer = require('mortimer');
	
	var app = express.createServer();
	
	var mortimer = new Mortimer({
		base: '/api',
		version: 'v1'
	});

	mortimer.router(Book).bind(app);
	mortimer.router(Author, {version: 'v2'}).bind(app);
	
	app.listen(3000);
*/

var Resource = require('./Resource.js');
var Router = require('./Router.js');
var util = require('./util.js');


var Mortimer = function (options) {
	var defaults = {
		'base': '/api',
		'version': 'v1'
	};
	this.options = util.extend(defaults, options);
};


// prototype alias
var fn = Mortimer.prototype;


fn.router = function (Model, options) {
	var resource = new Resource(Model);	
	var localOptions = util.extend({}, this.options, options);
	var router = new Router(resource, localOptions);
	return router;
};


// public api
module.exports = Mortimer;
