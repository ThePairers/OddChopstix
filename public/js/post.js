$(document).ready(function() {
	var newRating;
	var newReview;
	var foodID;
	var foodName;
	var foodDesc;
	var alcID;
	var alcName;
	var alcDesc;
	var pairID; //create logic to generate pair name from food + alc

	// when submit button is clicked at input
	$('#rate-btn').on('click', function(event) {
		event.preventDefault();
		foodName = $('#food-input').val().trim();
		foodDesc = $('#food-desc-input').val().trim();
		alcName = $('#alc-input').val().trim();
		alcDesc = $('#alc-desc-input').val().trim();
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
				postNewFood(checkAlc);
			} else {
			foodID = data.id;
			// callback goes to getAlchId function with food id
			callback(checkAlc);
			};
		});
	}

	function postNewFood(callback) {
		var newFood = {
			food_name: foodName,
			food_photo: 'none',
			food_description: foodDesc
		}
		$.post('/api/food', newFood, function(data) {
			console.log('post new food, return data: ', data);
			console.log(data.id);
			foodID = data.id;

			callback(checkAlc);
		});
	}

	function checkAlc(callback) {
		var alchQuery = "/?alc_name=" + alcName;
		$.get('/api/alcohol' + alchQuery, function(data) {
			
			// if the food is not found in the table it is created
			// with postNewFood function
			if (!data) {
				postNewAlc(checkAlc);
			} else {
			alcID = data.id;
			// callback goes to getAlchId function with food id
			callback(checkPairing);
			};
		});
	}

	function postNewAlc(callback) {
		var newAlcohol = {
			alc_name: alcName,
			alc_photo: 'none',
			alc_description: alcDesc
		}
		$.post('/api/alcohol', newAlcohol, function(data) {
			console.log('post new alcohol, return data: ', data);
			console.log(data.id);
			alcID = data.id;

			callback(checkPairing);
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
			// callback goes to getAlchId function with food id
			callback(postNewRating);
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
			callback(postNewRating);
		});
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
	}

});