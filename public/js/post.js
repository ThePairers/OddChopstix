$(document).ready(function() {
	$('#submit').on('click', function() {
		var alch = $('#alchInput').val().trim();
		var food = $('#foodInput').val().trim();
		var rating = $('#rating').val().trim();
		var review = $('#review').val().trim();

		getFoodId(food);
		getAlchId(alch);

		$.get('/api/alcohol' + alch, function(data) {
			console.log('/ ALCOHOL DATA /', data);

		});

		var newPairing = {};
	});
});

var getFoodId = function(food, callback) {
	var foodQuery = "/?food_name=" + food;
	$.get('/api/food' + foodQuery, function(data) {
		console.log('/ FOOD DATA /', data);

	});

}