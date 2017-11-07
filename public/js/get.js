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
	/*
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
	*/
// ///////////////////////////////////////////////////// //
// DISPLAYS FOOD/ALCH IN ROWS--------------------------- //
// ///////////////////////////////////////////////////// //

// Shows all foods in row on start 
	var htmlFoodDiv = function() {
		$.get('/api/foods', function(data) {
			for (var i = 0; i < data.length; i++) {
				console.log("food data: ", data);
				var item = '<div class="image slick-slide slick-active" data-type="food" data-id="' + data[i].id + '"><h5>' + data[i].food_name + '</h5><img src="' + data[i].food_photo + '"></div>'
				$("#food-search").slick('slickAdd', item);
			}
		});
	}

	var htmlAlcDiv = function() {
		$.get('/api/alcs', function(data) {
			console.log("alc data: ", data);
			for (var i = 0; i < data.length; i++) {
				var item = '<div class="image slick-slide slick-active" data-type="alc" data-id="' + data[i].id + '"><h5>' + data[i].alc_name + '</h5><img src="' + data[i].alc_photo + '"></div>'
				$("#alcohol-search").slick('slickAdd', item);
			}
		});
	}

	htmlFoodDiv();
	htmlAlcDiv();

	$('.slick-slider').on('click', '.slick-slide', function() {
		var dataID = $(this).attr("data-id");
		var dataType = $(this).attr("data-type");
		console.log(dataID);
		console.log(dataType);
		switch (dataType) {
			case "food":
				getFoodPairs(dataID);
				break;
			case "alc":
				getAlcPairs(dataID);
				break;
		}
	});

	var pairs = [];

	function getFoodPairs(id) {
		var foodQuery = "/?food_id=" + id;
		$.get('/api/pairs/food' + foodQuery, function(data) {
			if (!data) {
				console.log("no pairs");
			} else {
				console.log(data);
				for (var i = 0; i < data.length; i++) {
					var pair = {
						pair_name: data[i].pair_name,
						rating: ""
					}
					pairs.push(pair);
				}
			}
		}).then(function() {
			console.log(pairs);
		})
	}
	
	function getAlcPairs(id) {
		var alcQuery = "/?alc_id=" + id;
		$.get('/api/pairs/alc' + alcQuery, function(data) {
			if (!data) {
				console.log("no pairs");
			} else {
				console.log(data);
				for (var i = 0; i < data.length; i++) {
					var pair = {
						pair_name: data[i].pair_name,
						rating: ""
					}
					pairs.push(pair);
				}
			}
		});
	}

});