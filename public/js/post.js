$(document).ready(function() {

	// when submit button is clicked at input
	$('#submit').on('click', function() {
		var alch = $('#alchInput').val().trim();
		var food = $('#foodInput').val().trim();
		var newRating = $('#rating').val().trim();
		var newReview = $('#review').val().trim();

		getFoodId(food, alch, getAlchId);

		var newPairing = {};
	});
});

// Queries Food table and pulls food id
var getFoodId = function(food, alch, callback) {
	var foodQuery = "/?food_name=" + food;
	$.get('/api/food' + foodQuery, function(data) {
		console.log('/ FOOD DATA /', data);
		// callback goes to getalchId function with food id
		callback(data, alch, postNewPairing);
	});

}

// Queries Alcohol Table and pulls alch id
var getAlchId = function(foodId, alch, callback) {
	var alchQuery = "/?alc_name=" + alch;
	$.get('/api/alcohol' + alchQuery, function(data) {
		console.log('/ ALCH DATA /', data);
		// callback goes to postNewPairing function with food and alch id
		callback(food, data);
	})
}

// posts the new pairing with the food and alch ids
var postNewPairing = function(foodId, alchId) {
	var newPairing = {
		alc_id: alchId,
		food_id: foodId,
		rating: newRating,
		review: newReview
	};
	$.post('/api/pairing', newPairing);

};