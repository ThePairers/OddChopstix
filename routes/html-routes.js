var db = require("../models");

module.exports = function(app) {
	app.get('/', function(req, res) {
		console.log('/ GET FUNC RUNS /')
	});
}