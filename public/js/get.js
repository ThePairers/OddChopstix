


$(document).ready(function() {


	var pairings;
	var alcohols;
	var food;
	var pairs = [];
	


	// search query submit button
	$('#search-btn').on('click', function(event) {
		event.preventDefault();
		var searchQuery = $('#search-input').val().trim();
		//var radioButtons = $('input[name="inlineRadioOptions"]:checked').val();
		var radioButtons = document.querySelector('[name="inlineRadioOptions"]:checked').value;
		//$('.example-modal-body').empty();
		// Depending on which radio button is clicked, will query all matching food/alch/pairing names
		switch (radioButtons) {
			case 'Food':
				getFoods(searchQuery);
				break;
			case 'Alcohol':
				getAlcohols(searchQuery);
				break;
			default:
				console.log("Please pick a category to search by");
		}
	});

	// grabs all matching foods from foods table
	var getFoods = function(query) {
		$.get('/api/food/' + query, function(data) {
	// if statement when no results found 
			if (data.length == 0) {
			} else {
	// Pushes ids into foodIdArr which get sent to get pairId as Array
				var foodId = data[0].id;
				getFoodPairs(foodId);
			}
		}).then(function() {
			//createTable();
		});
	};

	// grabs all matching alch from alcohol table
	// search button clicked, gets id of food/alch in indiv table.
	// serach pairing table that matches the id
	// pull data. show pair-name and rating average
	var getAlcohols = function(query) {
		$.get('/api/alcohol/' + query, function(data) {
	// if statement when no results found 
			if (data.length == 0) {
			} else {
	// SENDS ALCOHOL DATA TO HTML
				var alcId = data[0].id;
				getAlcPairs(alcId);
			}
		}).then(function() {
		});
	};

	var showSearchModal = function() {
		$('.example-modal-body').empty();
		$('.example-modal-body').append($('<ul class="search-results-list">'))
		for (var i = 0; i < pairs.length; i++) {
			$('.search-results-list').append($('<li>' + pairs[i].pair_name + pairs[i].rating + pairs[i].num_rates + '</li>'));
		};
			$('#exampleModal').modal('show')

	}


// ///////////////////////////////////////////////////// //
// DISPLAYS FOOD/ALCH IN ROWS--------------------------- //
// ///////////////////////////////////////////////////// //

// Shows all foods in row on start 
	function htmlPairDiv(){
		pairings = [];
		$.get('/api/pairs', function(data){
			pairings = data;
		}).then(function(){
			pairings = data;
		})
	}

	var htmlFoodDiv = function() {
		$.get('/api/foods', function(data) {
			food = data;
			for (var i = 0; i < data.length; i++) {
				var item = '<div class="image slick-slide slick-active" data-type="food" data-id="' + data[i].id + '"><h5>' + data[i].food_name + '</h5><img src="' + data[i].food_photo + '"></div>'
				$("#food-search").slick('slickAdd', item);
			}
		}).then(function(){
			food = data;
		});
	}

	var htmlAlcDiv = function() {
		$.get('/api/alcs', function(data) {
			alcohols = data;
			for (var i = 0; i < data.length; i++) {
				var item = '<div class="image slick-slide slick-active" data-type="alc" data-id="' + data[i].id + '"><h5>' + data[i].alc_name + '</h5><img src="' + data[i].alc_photo + '"></div>'
				$("#alcohol-search").slick('slickAdd', item);
			}
		}).then(function(){
			alcohols = data;
		})
	}

	htmlFoodDiv();
	htmlAlcDiv();
	htmlPairDiv();
	

	$('.slick-slider').on('click', '.slick-slide', function(e) {
		e.preventDefault();
		var dataID = $(this).attr("data-id");
		var dataType = $(this).attr("data-type");
		switch (dataType) {
			case "food":
				getFoodPairs(dataID, showSearchModal);
				break;
			case "alc":
				getAlcPairs(dataID, showSearchModal);
				break;
		}
	});

	function getFoodPairs(id) {

		pairs = [];


		var foodQuery = "/?food_id=" + id;
		$.get('/api/pairs/food' + foodQuery, function(data) {
			if (!data || data.length == 0) {
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
			// callback goes to showSearchModal func
			//callback();
			//createTable();	
		});
	}
	
	function getAlcPairs(id) {
		pairs = [];
		var alcQuery = "/?alc_id=" + id;
		$.get('/api/pairs/alc' + alcQuery, function(data) {
			if (!data) {
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
      // callback goes to showSearchModal func
			//callback();
			//createTable();
		});
	}


	function calcRatings(pair_id, index) {
		$.get('/api/ratings/?pair_id=' + pair_id, function(data) {
			var sum = 0;	
			for (var i = 0; i < data.length; i++) {
				sum += data[i].rating;
			}
			var avgRating = sum / data.length;
			var roundedAvgRating = Math.round(100 * roundedAvgRating)/100;
			pairs[index].rating = roundedAvgRating;
			pairs[index].num_rates = data.length;
		}).then(function() {
			if (index + 1 == pairs.length) {
				createTable();	
			}
			
		});
	}

	function createTable() {
		var tableRows = [];
		console.log(pairings);
		console.log(food);
		console.log(alcohols);
		for (var i = 0; i < pairs.length; i++) {
			var field1 = '<td>' + pairs[i].pair_name + '</td>';
			var field2 = '<td>' + pairs[i].rating + '</td>';
			var field3 = '<td>' + pairs[i].num_rates + '</td>';
			var pics = getPics(pairs[i].pair_id);
			var field4 = makePairingPhotoDiv(pics[0], pics[1]);
			var tableData = field1 + field2 + field3 + field4;
			var row = '<tr>' + tableData + '</tr>';
			tableRows.push(row);
		} 
		$("#table-body").append(tableRows);
		$('#exampleModal').modal('show')
	}

	$(".modal").on("hidden.bs.modal", function(){
    	$(".example-modal-body").html('<table style="width:100%"><thead><tr><th>Name of Pair</th><th>Average Rating</th><th>Number of Ratings</th><th>Image</th></tr></thead><tbody id="table-body"></tbody></table>');
	});
	function getPics(pair_id){
		console.log(pair_id);
		var foodpic;
		var drinkpic;
		var pairing;
		console.log(food);
		for (var i = 0; i < pairings.length; i++) {
			if (pairings[i].pair_id = pair_id){
				pairing = pairings[i];
				break;
			}
		}
		console.log(pairing);
		for (var i = 0; i < food.length; i++) {
			if (pairing.food_id = food[i].id){
				foodpic = food[i].food_photo;
				break;
			}

		}
		for (var i = 0; i < alcohols.length; i++) {
			if (pairing.food_id = alcohols[i].id){
				drinkpic = alcohols[i].alc_photo;
				break;
			}

		}
		console.log(foodpic, drinkpic);
		return [foodpic, drinkpic];
	
	}
	function makePairingPhotoDiv(food_img_src, drink_img_src) {

		var fieldStart = "<td>";
		var fieldEnd = "</td>";
		var foodImg = '<img class="' + 'td-img" ' + 'src="' + food_img_src + '">';
		var drinkImg = '<img class="' + 'td-img" ' + 'src="' + drink_img_src + '">';
	
	
		var pair_photos = fieldStart + foodImg + drinkImg + fieldEnd;
		console.log(pair_photos);
		return pair_photos;


	}
});

