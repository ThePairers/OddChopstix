var Dropzone = require('dropzone');
var cloudinary = require("cloudinary");
cloudinary.config({
	Cloud name:	"oddchopstix",
   	API Key: "637332173612438",
	API Secret:	"sSafHcfjsB-1v8FhJwWOweKGfMg"
});




var myDropzone = new Dropzone(document.getElementById('dropzone-area'), {
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