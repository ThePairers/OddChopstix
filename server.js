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

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

var cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: 'oddchopstix',
  api_key: '637332173612438',
  api_secret: 'sSafHcfjsB-1v8FhJwWOweKGfMg'
});


// var myDropzone = new Dropzone(document.getElementById('dropzone-area'), {
// 	uploadMultiple: false,
// 	acceptedFiles:'.jpg,.png,.jpeg,.gif',
// 	parallelUploads: 6,
// 	url: 'https://api.cloudinary.com/v1_1/oddchopstix/image/upload'
// });


// myDropzone.on('sending', function (file, xhr, formData) {
// 	formData.append('api_key', 637332173612438);
// 	formData.append('timestamp', Date.now() / 1000 | 0);
// 	formData.append('upload_preset', 'preset1');
// });
// myDropzone.on('success', function (file, response) {
// 	console.log('Success! Cloudinary public ID is', response.public_id);
// });

cloudinary.uploader.upload("./public/images/jameson.jpg", {tags: "example"})
    .then(function(error, result) {
    	console.log(result);
    	console.log(error);
    });
