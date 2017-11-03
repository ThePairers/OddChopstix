var db = require("../models");

module.exports = function(app) {

// FOOD TABLE ////////////////////////////////////////////
//------------------------------------------------------//

// connects with public/post.js, checks if food is in food table,
// if food is in table, returns id, if food is not in table then returns null
	app.get('/api/food', function(req, res) {
		var food_name = req.query.food_name;
		console.log('food get QUERY:', food_name);		
		db.Food.findOne({
			where: {
				food_name: food_name
			}
		}).then(function(dbFood) {
			console.log('DBFOODNAME', dbFood)
			res.json(dbFood);
		});
	});

	app.post('/api/food', function(req, res) {
		console.log('api food post runs')
		db.Food.create(req.body).then(function(dbFood) {
			res.json(dbFood);
		})	
	}) 

// ALCOHOL TABLE /////////////////////////////////////////
//------------------------------------------------------//
	app.get('/api/alcohol', function(req, res) {
		var alc_name = req.query.alc_name;
		console.log('alch get QUERY:', alc_name);
		db.Alcohol.findOne({
			where: {
				alc_name: alc_name
			}
		}).then(function(dbAlch) {
			console.log('DBALCH', dbAlch);
			res.json(dbAlch);
		});
	})

	app.post('/api/alcohol', function(req, res) {
		console.log('api alc post runs')
		db.Alcohol.create(req.body).then(function(dbAlch) {
			res.json(dbAlch);
		})	
	}) 
// PAIRING TABLE /////////////////////////////////////////
//------------------------------------------------------//
	
	app.get('/api/pairing', function(req, res) {
		var food_id = req.query.food_id;
		var alc_id = req.query.alc_id;
		//console.log('pair get QUERY:', pair_name);
		db.Pairing.findOne({
			where: {
				food_id: food_id,
				alc_id: alc_id
			}
		}).then(function(dbPair) {
			console.log('dbPair', dbPair);
			res.json(dbPair);
		});
	})

	app.post('/api/pairing', function(req, res) {
		db.Pairing.create(req.body).then(function(dbPost) {
			res.json(dbPost);
		})		
	});

	app.post('/api/rating', function(req, res) {
		db.Rating.create(req.body).then(function(dbPost) {
			res.json(dbPost);
		})		
	});
	
}