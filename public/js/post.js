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
		console.log(foodName);
		console.log(foodDesc);
		alcName = $('#alc-input').val().trim();
		alcDesc = $('#alc-desc-input').val().trim();
		rating = document.querySelector('[name="gridRadios"]:checked').value;
		newReview = $('#review-input').val().trim();
		console.log(newRating);
		console.log(newReview);
		checkFood(checkAlc);
	});

	function checkFood(callback) {
		var foodQuery = "/?food_name=" + foodName;
		$.get('/api/food' + foodQuery, function(data) {
			
			// if the food is not found in the table it is created
			// with postNewFood function
			if (data == null) {
				console.log('data is null');
				postNewFood(foodName, foodDesc, checkAlc);
			} else {
			foodID = data.id;
			// callback goes to getAlchId function with food id
			callback(checkAlc);
			};
		});
	}

	function postNewFood(foodName, foodDesc, callback) {
		var newFood = {
			food_name: foodName,
			food_photo: 'none',
			food_description: foodDesc
		}
		$.post('/api/food', newFood, function(data) {
			console.log('post new food, return data: ', data);
			console.log(data.id);
			foodId = data.id;

			callback(checkAlc);
		});
	}

	function checkAlc(callback) {
		var alchQuery = "/?alc_name=" + alcName;
		$.get('/api/alcohol' + alchQuery, function(data) {
			
			// if the food is not found in the table it is created
			// with postNewFood function
			if (data == null) {
				console.log('data is null');
				postNewAlc(alcName, alcDesc, checkAlc);
			} else {
			alcID = data.id;
			// callback goes to getAlchId function with food id
			callback(checkPairing);
			};
		});
	}

	function postNewAlc(alcName, alcDesc, callback) {
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
		var alcQuery = "/?alc_id=" + alcID;
		$.get('/api/pairing' + foodQuery + alcQuery, function(data) {
			
			// if the food is not found in the table it is created
			// with postNewFood function
			if (data == null) {
				console.log('data is null');
				postNewPairing(foodId, alcID, postNewRating);
			} else {
			pairID = data.id;
			// callback goes to getAlchId function with food id
			callback(postNewRating);
			};
		});
	}

	function postNewPairing(foodId, alcId, callback) {
		var newPairing = {
			alc_id: alcId,
			food_id: foodId,
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