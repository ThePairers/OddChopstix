$(document).ready(function() {
	var newRating;
	var newReview;
	var foodID;
	var foodName;
	var foodPhoto;
	var foodDesc;
	var alcID;
	var alcName;
	var alcPhoto;
	var alcDesc;
	var pairID; //create logic to generate pair name from food + alc

	// when submit button is clicked at input
	$('#rate-btn').on('click', function(event) {
		event.preventDefault();
		foodName = $('#food-input').val().trim();
		alcName = $('#alc-input').val().trim();
		rating = document.querySelector('[name="gridRadios"]:checked').value;
		newReview = $('#review-input').val().trim();
		checkFood(checkAlc);	
	});

	function checkFood(callback) {
		var foodQuery = "/?food_name=" + foodName;
		$.get('/api/food' + foodQuery, function(data) {
			
			// if the food is not found in the table it is created
			// with postNewFood function
			if (!data) {
				newFoodInputs(postNewFood);
			} else {
			foodID = data.id;
			// callback goes to checkAlc function with food id
			callback();
			};
		});
	}
// GRABS FOOD PHOTO/DESCRIPTION IF NOT FOUND IN DB
	function newFoodInputs(callback) {
		// empties modal and puts new inputs with flags based on paramter
		emptyAppendModalInputs('food');

		$('#food-submit-btn').on('click', function(event) {
			event.preventDefault();
			foodPhoto = $('#food-photo-input').val().trim();
			foodDesc = $('#food-desc-input').val().trim();

// callback goes to postNewFood func after updating foodphoto and foodDesc variables.
		})
		callback();
	};

// sends new food entry into food table
	function postNewFood(callback) {
		console.log('postNewFood func runs')
		var newFood = {
			food_name: foodName,
			food_photo: foodPhoto,
			food_description: foodDesc
		}
		$.post('/api/food', newFood, function(data) {
			console.log('post new food, return data: ', data);
			console.log(data.id);
			foodID = data.id;

// 	goes to checkAlc function after inserting into food table. 
			checkAlc();
		});
	}

	function checkAlc(callback) {
		console.log('checkAlc runs')
		var alcQuery = "/?alc_name=" + alcName;
		$.get('/api/alcohol' + alcQuery, function(data) {
			
			// if the food is not found in the table it is created
			// with postNewFood function
			if (!data) {
				newAlcInputs(postNewAlc);
			} else {
			alcID = data.id;
			// if success, goes to checkPairing
			checkPairing();
			};
		});
	}

	function newAlcInputs(callback) {
		console.log('newAlcInputs runs');
		emptyAppendModalInputs('alc');
		$('#alc-submit-btn').on('click', function(event) {
			event.preventDefault();
			alcPhoto = $('#alc-photo-input').val().trim();
			alcDesc = $('#alc-desc-input').val().trim();

			postNewAlc(checkPairing);
		})
	};

	function postNewAlc(callback) {
		console.log('postNewAlc runs');
		// REPLACES MODAL WITH NEW ALC INPUTS

		var newAlcohol = {
			alc_name: alcName,
			alc_photo: alcPhoto,
			alc_description: alcDesc
		}
		console.log('newAlcohol after inputs', newAlcohol);
		$.post('/api/alcohol', newAlcohol, function(data) {
			console.log('post new alcohol, return data: ', data);
			console.log(data.id);
			alcID = data.id;
		// callback goes to checkPairing function
			callback(postNewPairing);
		});
	}

	function checkPairing(callback) {
		var foodQuery = "/?food_id=" + foodID;
		var alcQuery = "&alc_id=" + alcID;
		$.get('/api/pairing' + foodQuery + alcQuery, function(data) {
			console.log("data: ", data);
			// if the food is not found in the table it is created
			// with postNewFood function
			if (!data) {
				postNewPairing(postNewRating);
			} else {
			pairID = data.id;
			// callback goes to postNewPairing
			postNewPairing(postNewRating);
			};
		});
	}

	function postNewPairing(callback) {
		var newPairing = {
			alc_id: alcID,
			food_id: foodID,
		};
		$.post('/api/pairing', newPairing, function(data) {
			pairID = data.id;
		});
	// callback goes to postNewRating func
		callback();
	};

	function postNewRating() {
		var newRating = {
			pair_id: pairID,
			rating: rating,
			review: newReview
		};
		$.post('/api/rating', newRating, function(data) {
			console.log(data);
		});
		postSuccessModal();
	}

// EMPTIES POST MODAL THEN ADDS INPUT DEPENDING ON FOOD/ALC PARAMATER
	function emptyAppendModalInputs(replace) {
		$('#post-modal-form').empty();
		$('#post-modal-footer').empty();
		$('#modal-title').html('Additional Info <p>We did not find your ' + replace + ' in our database, please provide additional details');
		var $div = $('<div class="form-group post-modal-form-rows row">')
									.append('<label class="col-sm-2 col-form-label">Add Photo')
									.append('<div class="col-sm-10"> <input class="form-control" id="'+ replace +'-photo-input" placeholder="Photo" value="photo.jpg">')
									.append('<label class="col-sm-2 col-form-label">Description')
									.append('<div class="col-sm-10"> <input class="form-control" id="'+ replace + '-desc-input" placeholder="Describe it!" value="blahblah description">');
		$('#post-modal-form').append($div);
		var $footer = $('<button id="'+ replace + '-submit-btn" class="btn btn-primary">Submit</button> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
		$('#post-modal-footer').append($footer);
	}

	function postSuccessModal() {
		$('#post-modal-form').empty();
		$('#post-modal-footer').empty();
		$('#modal-title').empty();
		$('#post-modal-form').html('YOUR POST HAS BEEN SUCCESSFULLY POSTED');
		$('#post-modal-footer').append('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>')
	}
});