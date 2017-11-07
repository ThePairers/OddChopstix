$(document).ready(function() {

	// search query submit button
	$('#search-btn').on('click', function(event) {
		event.preventDefault();
		console.log('search-btn clicked func runs');
		var searchQuery = $('#search-input').val().trim();
		//var radioButtons = $('input[name="inlineRadioOptions"]:checked').val();
		console.log('searchQuery', searchQuery);

		var radioButtons = document.querySelector('[name="inlineRadioOptions"]:checked').value;
		console.log('radioButtons', radioButtons);		
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
			console.log(typeof data);
	// if statement when no results found 
			if (data.length == 0) {
				console.log('no results found');
			} else {
	// SENDS FOOD DATA TO HTML
				console.log('results found')
			}
		});
	};
	// grabs all matching alch from alcohol table
	var getAlcohols = function(query) {
		console.log('get alch func runs');
		$.get('/api/alcohol/' + query, function(data) {
			console.log(data);
			console.log(typeof data);
	// if statement when no results found 
			if (data.length == 0) {
				console.log('no results found');
			} else {
	// SENDS ALCOHOL DATA TO HTML
				console.log('results found')
			}
		});
	};
	// grabs all matching pairings from pairing table
	var getPairings = function(query) {
		console.log('get pairings func runs');
		$.get('/api/pairing/' + query, function(data) {
			console.log(data);
			console.log(typeof data);
	// if statement when no results found 
			if (data.length == 0) {
				console.log('no results found');
			} else {
	// SENDS PAIRINGS DATA TO HTML
				console.log('results found')
			}
		});
	};
// ///////////////////////////////////////////////////// //
// DISPLAYS FOOD/ALCH IN ROWS--------------------------- //
// ///////////////////////////////////////////////////// //

// Shows all foods in row on start 
	var htmlFoodDiv = function() {
		var foodDiv = document.getElementById('food-div')
		$.get('/api/foods', function(data) {
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

});