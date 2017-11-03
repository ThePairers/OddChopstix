# OddCouples

Function Logic on post.js:

checkFood runs
 	if fail
 		newFoodInputs runs
 		postNewfood runs
 	if success
 		checkAlc runs
checkAlc runs
	if fail
 		newAlcInputs runs
		postNewAlc runs
 		checkPairing runs
 	if success
 		checkPairing runs
checkPairing runs
 	if fail
		postNewPairing runs
 		postNewRating runs
 	if success
 		postNewRating runs
