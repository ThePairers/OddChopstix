// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;


// // Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/post-routes.js")(app);
require("./routes/api-get-routes.js")(app);
// require("./routes/dropzone-routes.js")(app);
require("./routes/shutterstock-routes.js")(app);

var sequelizeHeroku = require('sequelize-heroku').connect();

if (sequelizeHeroku)
{
    sequelize.authenticate().then( function() {
        var config = sequelize.connectionManager.config;
        console.log('sequelize-heroku: Connected to '+config.host+' as '+config.username+'.');
        
        sequelize.query('SELECT 1+1 as test').then( function(res) {
            
            console.log('1+1='+res[0].test);
            
        });
        
    }).catch( function(err) {
        var config = sequelize.connectionManager.config;
        console.log('Sequelize: Error connecting '+config.host+' as '+config.user+': '+err);
    });
}
else
{
    console.log('No environnement variable found.');
}




// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

/*
var cloudinary = require("cloudinary");
	cloudinary.config({
	  cloud_name: 'oddchopstix',
	  api_key: '637332173612438',
	  api_secret: 'sSafHcfjsB-1v8FhJwWOweKGfMg'
});
*/




