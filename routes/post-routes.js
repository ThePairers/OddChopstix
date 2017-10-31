// var db = require("../models");

module.exports = function(app) {
	app.get('/api/food', function(req, res) {
		var query = {};
		query.food_name = req.query.food_name;
		console.log('food get QUERY:', query)
	})

	app.get('/api/alcohol', function(req, res) {
		var query = {};
		query.alc_name = req.query.alc_name;
		console.log('alch get QUERY:', query);
	})
	app.post('/api/pairing', function(req, res) {
		console.log('POST pairing REQ: ', req);
		db.Post.create(req.body).then(function(dbPost) {
			res.json(dbPost);
		})		
	});
}