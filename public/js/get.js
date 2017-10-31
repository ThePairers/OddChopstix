$(document).ready(function() {

	// search query submit button
	$('#search-btn').on('click', function(event) {
		event.preventDefault();

		var searchQuery = $('#search-input').val().trim();
		var radioButtons = document.querySelector('[name="inLineRadioOptions"]:checked').value();
		// Depending on which radio button is clicked, will query all matching food/alch/pairing names
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
	// grabs all matching foods from foods table
	var getFoods = function(query) {
		console.log('getfoods func runs');
		$.get('/api/food/' + query, function(data) {
			console.log(data);
		}
	};
	// grabs all matching alch from alcohol table
	var getAlcohols = function(query) {
		console.log('get alch func runs');
		$.get('/api/alcohol/' + query, function(data) {
			console.log(data);
		}
	};
	// grabs all matching pairings from pairing table
	var getPairings = function(query) {
		console.log('get pairings func runs');
		$.get('/api/pairing/' + query, function(data) {
			console.log(data);
		}
	};
// ///////////////////////////////////////////////////// //
// ---------------------------------------------------- //
// ///////////////////////////////////////////////////// //

// Shows all foods in row on start 
	var htmlFoodDiv = function() {
		var foodDiv = document.getElementById('food-div')
		$.get('/api/food', function(data) {
			console.log(data);

			foodDiv.innerHTML = data;
		});


	}

	var htmlAlchDiv = function() {
	var alchDiv = document.getElementById('alch-div')

		$.get('/api/alcohol', function(data) {
			console.log(data);

			alchDiv.innerHTML = data;
		});
	}

	htmlFoodDiv();
});