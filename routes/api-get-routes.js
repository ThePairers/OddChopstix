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

// SEARCH WITH RADIO BUTTONS ROUTES ////////////////////////////
// =============================================================
// gets all foods with same name

	app.get('/api/food/:food_name', function(req, res) {
		db.Food.findAll({
			where: {
				food_name: req.params.food_name
			}
		}).then(function(dbPost) {
			res.json(dbPost);
		})
	})
// gets all alcohols with same name
	app.get('/api/alcohol/:alcohol_name', function(req, res) {

		db.Alcohol.findAll({
			where: {
				alc_name: req.params.alcohol_name
			}
		}).then(function(dbPost) {
			res.json(dbPost);

		})
	})

// ===========================================================
// DISPLAYS ALL FOOD/ALCOHOL/PAIRINGS IN ROWS ////////////////
// -----------------------------------------------------------
	app.get("/api/pairs", function(req, res){
		db.Pairing.findAll({

		}).then(function(dbPost) {
			res.json(dbPost);
		})
	})

	app.get("/api/foods", function(req, res) {
		db.Food.findAll({
		}).then(function(dbPost) {
			res.json(dbPost);
		})
	})
	
	app.get("/api/alcs", function(req, res) {
		db.Alcohol.findAll({
		}).then(function(dbPost) {
			res.json(dbPost);
		})
	})

	app.get("/api/pairs/food", function(req, res) {
		var food_id = req.query.food_id;
		db.Pairing.findAll({
			where: {
				food_id: food_id
			}
		}).then(function(dbPost) {
			res.json(dbPost);
		})
	})

	app.get("/api/pairs/alc", function(req, res) {
		var alc_id = req.query.alc_id;
		db.Pairing.findAll({
			where: {
				alc_id: alc_id
			}
		}).then(function(dbPost) {
			res.json(dbPost);
		})
	})

	app.get('/api/ratings', function(req, res) {
		var pair_id = req.query.pair_id;
		db.Rating.findAll({
			where: {
				pair_id: pair_id
			}
		}).then(function(db) {
			res.json(db);
		})
	})
};