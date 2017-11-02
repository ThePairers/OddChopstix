$(document).ready(function() {
	var newRating;
	var newReview;

	// when submit button is clicked at input
	$('#rate-btn').on('click', function(event) {
		event.preventDefault();
		console.log('rate-btn clicked')
		var alch = $('#alc-input').val().trim();
		var food = $('#food-input').val().trim();
		var newRating = document.querySelector('[name="gridRadios"]:checked').value;
		var newReview = $('#review-input').val().trim();
		console.log(newRating);
		console.log(newReview);
		getFoodId(food, alch, newRating, newReview, getAlchId);

	});

	// Queries Food table and pulls food id
	var getFoodId = function(food, alch, rating, review, callback) {
		var foodQuery = "/?food_name=" + food;
		console.log('get food id func runs, post.js')
		$.get('/api/food' + foodQuery, function(data) {
			console.log('/ FOOD DATA /', data);
			
			// if the food is not found in the table it is created
			// with postNewFood function
			if (data == null) {
				console.log('data is null');
				postNewFood(food, alch, rating, review, getAlchId);
			} else {
			var foundFoodId = data.id;
			// callback goes to getAlchId function with food id
			callback(foundFoodId, alch, rating, review, postNewPairing);
			};
		});
	}

	var postNewFood = function(food, alch, rating, review, callback) {
		var newFood = {
			food_name: food,
			food_photo: 'none',
			food_description: 'this describes this.'
		}
		$.post('/api/food', newFood, function(data) {
			console.log('post new food, return data: ', data);
			console.log(data.id);
			var foodId = data.id;

			callback(foodId, alch, rating, review, postNewPairing);
		})
	}

	// Queries Alcohol Table and pulls alch id
	var getAlchId = function(foodId, alch, rating, review, callback) {
		console.log('get alch id func runs, post.js')

		var alchQuery = "/?alc_name=" + alch;
		$.get('/api/alcohol' + alchQuery, function(data) {
			console.log('/ ALCH DATA /', data);

			
			// if alcohol is not found in table then it is created
			// with postNewAlcohol function
			if (data == null) {
				postNewAlcohol(foodId, alch, rating, review, postNewPairing);

			} else {
			var foundAlchId = data.id;
			// callback goes to postNewPairing function with food and alch id
			callback(foodId, foundAlchId, rating, review);
			};
		})
	}

	var postNewAlcohol = function(foodId, alch, rating, review, callback) {
		var newAlcohol = {
			alc_name: alch,
			alc_photo: 'none',
			alc_description: 'this describes this.'
		}
		$.post('/api/alcohol', newAlcohol, function(data) {
			console.log('post new alcohol, return data: ', data);
			console.log(data.id);
			var alcoholId = data.id;

			callback(foodId, alcoholId, rating, review);
		})
	}

// posts the new pairing with the food and alch ids
	var postNewPairing = function(foodId, alchId, rating, review) {
		var newPairing = {
			alc_id: alchId,
			food_id: foodId,
			rating: rating,
			review: review
		};
		$.post('/api/pairing', newPairing);
	};
	
});