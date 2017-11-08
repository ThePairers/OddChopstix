$(document).ready(function() {


	var pairs = [];

	// search query submit button
	$('#search-btn').on('click', function(event) {
		event.preventDefault();
		console.log('search-btn clicked func runs');
		var searchQuery = $('#search-input').val().trim();
		//var radioButtons = $('input[name="inlineRadioOptions"]:checked').val();
		console.log('searchQuery', searchQuery);

		var radioButtons = document.querySelector('[name="inlineRadioOptions"]:checked').value;
		console.log('radioButtons', radioButtons);		
		$('.search-modal-body').empty();
		// Depending on which radio button is clicked, will query all matching food/alch/pairing names
		switch (radioButtons) {
			case 'Food':
				getFoods(searchQuery);
				break;
			case 'Alcohol':
				getAlcohols(searchQuery);
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
	// Pushes ids into foodIdArr which get sent to get pairId as Array
				var foodId = data[0].id;
				console.log('foodId', foodId);
				getFoodPairs(foodId, showSearchModal);

				console.log('results found')
			}
		});
	};

	// grabs all matching alch from alcohol table
	// search button clicked, gets id of food/alch in indiv table.
	// serach pairing table that matches the id
	// pull data. show pair-name and rating average
	var getAlcohols = function(query) {
		console.log('get alch func runs');
		$.get('/api/alcohol/' + query, function(data) {
			console.log(data);
	// if statement when no results found 
			if (data.length == 0) {
				console.log('no results found');
			} else {
	// SENDS ALCOHOL DATA TO HTML
				var alcId = data[0].id;
				console.log('alcId', alcId);
				getAlcPairs(alcId, showSearchModal);

				console.log('results found')
			}
		});
	};

	var showSearchModal = function() {
		$('.example-modal-body').empty();
		$('.example-modal-body').append($('<ul class="search-results-list">'))
		for (var i = 0; i < pairs.length; i++) {
			$('.search-results-list').append($('<li>' + pairs[i].pair_name + '</li>'));
		};
			$('#exampleModal').modal('show')

	}

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
				console.log("food data retrieved!");
				var item = '<div class="image slick-slide slick-active" data-toggle="modal" data-target="#exampleModal" data-type="food" data-id="' + data[i].id + '"><h5>' + data[i].food_name + '</h5><img src="' + data[i].food_photo + '"></div>'
				$("#food-search").slick('slickAdd', item);
			}
		});
	}

	var htmlAlcDiv = function() {
		$.get('/api/alcs', function(data) {
			alcohols = data;
			console.log("alc data retrieved!");
			for (var i = 0; i < data.length; i++) {
				var item = '<div class="image slick-slide slick-active" data-toggle="modal" data-target="#exampleModal" data-type="alc" data-id="' + data[i].id + '"><h5>' + data[i].alc_name + '</h5><img src="' + data[i].alc_photo + '"></div>'
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

	function getFoodPairs(id, callback) {
		var foodQuery = "/?food_id=" + id;
		$.get('/api/pairs/food' + foodQuery, function(data) {
			if (!data) {
				console.log("no pairs");
			} else {
				for (var i = 0; i < data.length; i++) {
					var pair = {
						pair_name: data[i].pair_name,
						pair_id: data[i].id,
						rating: "",
						num_rates: ""
					}
					pairs.push(pair);
					calcRatings(data[i].id, i);
				}
			}
		}).then(function() {
			callback();
			console.log(pairs);
		});
	}
	
	function getAlcPairs(id, callback) {
		var alcQuery = "/?alc_id=" + id;
		$.get('/api/pairs/alc' + alcQuery, function(data) {
			if (!data) {
				console.log("no pairs");
			} else {
				for (var i = 0; i < data.length; i++) {
					var pair = {
						pair_name: data[i].pair_name,
						pair_id: data[i].id,
						rating: "",
						num_rates: ""
					}
					pairs.push(pair);
					calcRatings(data[i].id, i);					
				}
			}
		}).then(function() {
			callback();
			console.log(pairs);
		});
	}

	function calcRatings(pair_id, index) {
		$.get('/api/ratings/?pair_id=' + pair_id, function(data) {
			var sum = 0;	
			for (var i = 0; i < data.length; i++) {
				sum += data[i].rating;
			}
			pairs[index].rating = sum / data.length;
			pairs[index].num_rates = data.length;
			console.log(pairs[index]);
		}).then(function() {
			console.log("calcRatings");			
		});
	}

});