$(document).ready(function() {
	var newRating;
	var newReview;
	var photo; //global variable changes based on getShutterimg func
	var foodID;
	var foodName;
	var foodPhoto;
	var alcID;
	var alcName;
	var alcPhoto;
	var pairID; 

	// when newpairingmodal btn is clicked
	$('#newPairingModalBtn').on('click', function(event) {
		event.preventDefault();
		$('.rating-stars').prop('checked', false);
		$('#food-input').val('');
		$('#alc-input').val('');
	})

	$('#save-btn').on('click', function(event) {
		event.preventDefault();
		foodName = $('#food-input2').val().trim();
		postNewFood(checkAlc);	
	});

	// when submit button is clicked at input
	$('#rate-btn').on('click', function(event) {
		event.preventDefault();
		foodName = $('#food-input').val().trim();
		alcName = $('#alc-input').val().trim();
		rating = document.querySelector('[name="gridRadios"]:checked').value;
		checkFood(checkAlc);	
		$('#newPairingModal').modal('hide');
	});

	function getShutterImg(query) {
		$.get('/api/shutter/' + query, function(data) {

			for (var i = 0; i < 5; i++) {
				var image = data.data[i].assets.large_thumb.url;
				$('.img-zone').append($("<img class='food-alc-pics' src='" + image + "'>"));
			}
			$('.food-alc-pics').on('click', function(e) {
				e.preventDefault();
				$('.food-alc-pics').removeClass('img-clicked');
				$(this).addClass('img-clicked');
			})
			// var image_url = data.data[0].assets.large_thumb.url;
			// photo = image_url;
		});
	}

	function checkFood() {
		var foodQuery = "/?food_name=" + foodName;
		$.get('/api/food' + foodQuery, function(data) {
			
			// if the food is not found in the table it is created
			// with postNewFood function
			if (!data) {
				newFoodInputs();
			} else {
			foodID = data.id;
			// callback goes to checkAlc function with food id
			checkAlc();
			};	
		});
	};

// GRABS FOOD PHOTO/DESCRIPTION IF NOT FOUND IN DB
	function newFoodInputs() {

		$('.img-zone').empty();

		getShutterImg(foodName);
		$('#newFoodModal').modal('show');

		$('#food-submit-btn').on('click', function(event) {
			event.stopImmediatePropagation();
			event.preventDefault();
			foodPhoto = $('.img-clicked').attr('src');
		$('#newFoodModal').modal('hide');
			postNewFood();
		})

	};

// sends new food entry into food table
	function postNewFood(callback) {
		var newFood = {
			food_name: foodName,
			food_photo: foodPhoto
		}
		$.post('/api/food', newFood, function(data) {
			foodID = data.id;

// 	goes to checkAlc function after inserting into food table. 
			checkAlc();
		});
	}

	function checkAlc(callback) {
		var alcQuery = "/?alc_name=" + alcName;
		$.get('/api/alcohol' + alcQuery, function(data) {
			
			// if the food is not found in the table it is created
			// with postNewFood function
			if (!data) {
				newAlcInputs(postNewAlc);
			} else {
			alcID = data.id;
			// if success, goes to checkPairing
			checkPairing();
			};
		});
	}

	function newAlcInputs(callback) {

		$('.img-zone').empty();

		getShutterImg(alcName);
		$('#newAlcModal').modal('show');

		$('#alc-submit-btn').on('click', function(event) {
			event.stopImmediatePropagation();
			event.preventDefault();
			alcPhoto = $('.img-clicked').attr('src');
		$('#newAlcModal').modal('hide');
			postNewAlc(checkPairing);
		})
	};

	function postNewAlc(callback) {

		var newAlcohol = {
			alc_name: alcName,
			alc_photo: alcPhoto,
		}
		$.post('/api/alcohol', newAlcohol, function(data) {
			alcID = data.id;
		// callback goes to checkPairing function
			callback(postNewPairing);
		});
	}

	function checkPairing(callback) {
		var foodQuery = "/?food_id=" + foodID;
		var alcQuery = "&alc_id=" + alcID;
		$.get('/api/pairing' + foodQuery + alcQuery, function(data) {
			// if the food is not found in the table it is created
			// with postNewFood function
			if (!data) {
				postNewPairing(postNewRating);
			} else {
			pairID = data.id;
			// callback goes to postNewPairing
			postNewRating();
			};
		});
	}

	function postNewPairing(callback) {
		var pairName = foodName + " & " + alcName;
		var newPairing = {
			pair_name: pairName,
			alc_id: alcID,
			food_id: foodID
		};
		$.post('/api/pairing', newPairing, function(data) {
			pairID = data.id;
			callback();
		});
	// callback goes to postNewRating func

	};

	function postNewRating() {
		var newRating = {
			pair_id: pairID,
			rating: rating,
			review: newReview
		};
		$.post('/api/rating', newRating, function(data) {
			location.reload();
		});

	}

});