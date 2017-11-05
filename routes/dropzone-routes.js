
var db = require("../models");
var Dropzone = require("dropzone");

module.exports = function(app) {


var myDropzone = new Dropzone(document.getElementById('photo-drop'), {
	uploadMultiple: false,
	acceptedFiles:'.jpg,.png,.jpeg,.gif',
	parallelUploads: 6,
	url: 'https://api.cloudinary.com/v1_1/oddchopstix/image/upload'
});


myDropzone.on('sending', function (file, xhr, formData) {
	formData.append('api_key', 637332173612438);
	formData.append('timestamp', Date.now() / 1000 | 0);
	formData.append('upload_preset', 'preset1');
});

myDropzone.on('success', function (file, response) {
	console.log('Success! Cloudinary public ID is', response.public_id);
});


};

cloudinary.v2.uploader.upload("../images/jameson.jpg", 
    function(error, result) {console.log(result)});