# OddChopstix

Add your favorite (and least favorite) pairings!

Check out other users' reviews to find the perfect pairing for your food or alcoholic beverage

[Website](http://odd-chopstix.herokuapp.com)

## Things to Add Next:
	1. Capitalize first letter of each word in new food/alcohol
	2. Add review input
	3. better image api/input system
		3a. If no image found then returns to previous/allows another search query
	4. If post new pairing review is incomplete/cancelled then deletes all entries that were submitted and resets





##post.js Logic

	checkFood
		New FoodInputs
		checkAlc
			NewAlcInputs
			CheckPairing
				reviewSummary
					on edit button click
						if food/alcname/rating then
							editpairingModal
								run checks then summary
						if food/alcphoto then
							newFood/AlcInputs
								run checks then summary
					on summary submit btn click
						postNewFood
							postNewAlc
								postNewPairing
									postNewRating

