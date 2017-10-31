// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

	app.get('/api/food/:food_name', function(req, res) {

		db.Food.findAll({
			where: {
				req.params.food_name
			}
		}).then(function(dbPost) {
			res.json(dbPost);
			console.log(dbPost);
		})
	})

	app.get('/api/alcohol/:alcohol_name', function(req, res) {

		db.Alcohol.findAll({
			where: {
				req.params.alcohol_name
			}
		}).then(function(dbPost) {
			res.json(dbPost);
			console.log(dbPost);
		})
	})

	app.get('/api/food/:pairing_name', function(req, res) {

		db.Pairing.findAll({
			where: {
				req.params.pairing_name
			}
		}).then(function(dbPost) {
			res.json(dbPost);
			console.log(dbPost);
		})
	})
}