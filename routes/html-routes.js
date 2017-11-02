
var db = require("../models");

var path = require("path");

module.exports = function(app) {
	
	app.get('/', function(req, res) {
		console.log('/ GET FUNC RUNS /')
		  res.sendFile(path.join(__dirname, "../index.html"));
  });
	
};


