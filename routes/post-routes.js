// var db = require("../models");

module.exports = function(app) {
	app.get('/api/food', function(req, res) {
		var query = {};
		query.food_name = req.query.food_name;
		
	})

	app.post('/api/posts', function(req, res) {
		db.Post.create(req.body).then(function(dbPost) {
			res.json(dbPost);
		})		
	});

}