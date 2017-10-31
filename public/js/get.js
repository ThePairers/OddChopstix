$(document).ready(function() {

	// search query submit button
	$('#search-btn').on('click', function(event) {
		event.preventDefault();

		var searchQuery = $('#search-input').val().trim();
		var radioButtons = document.querySelector('[name="inLineRadioOptions"]:checked').value();

		switch (radioButtons) {
			case 'food':
				getFoods(searchQuery);
				break;
			case 'alcohol':
				getAlcohols(searchQuery);
				break;
			case 'pairings':
				getPairings(searchQuery);
				break;
			default:
				alert('choose a radio button to search');
		}
	});

	var getFoods = function(query) {
		console.log('getfoods func runs');
		$.get('/api/food/' + query, function(data) {
			console.log(data);
		}
	};

	var getAlcohols = function(query) {
		console.log('get alch func runs');
		$.get('/api/alcohol/' + query, function(data) {
			console.log(data);
		}
	};

	var getPairings = function(query) {
		console.log('get pairings func runs');
		$.get('/api/pairing/' + query, function(data) {
			console.log(data);
		}
	};
});