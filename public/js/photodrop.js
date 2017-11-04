      // Dropzone.options.uploadWidget = {
      //   paramName: 'file',
      //   maxFilesize: 2, // MB
      //   maxFiles: 1,
      //   dictDefaultMessage: 'Drag an image here to upload, or click to select one',
      //   headers: {},
      //   acceptedFiles: '*',
      //   init: function() {
      //   	console.log("hi");
      //     this.on('success', function( file, resp ){
      //       console.log( file );
      //       console.log( resp );
      //     });
      //     this.on('thumbnail', function(file) {
      //       if ( file.width < 640 || file.height < 480 ) {
      //       	console.log('His');
      //         file.rejectDimensions();
      //       } else {
      //       	console.log('His');
      //         file.acceptDimensions();
      //       }
      //     });
      //   },
      //   accept: function(file, done) {
      //     file.acceptDimensions = done;
      //     file.rejectDimensions = function() {
      //       done('The image must be at least 640 x 480px')
      //     };
      //   }
      // };




// var myDropzone = new Dropzone(document.getElementById('photo-drop'), {
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

// // cloudinary.v2.uploader.upload("../images/jameson.jpg", 
//     function(error, result) {console.log(result)});


