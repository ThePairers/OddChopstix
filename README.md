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



JT things to do:

when newFoodInputs runs then hides pairing modal, after hides pairing opens food modal then on submit empties and hides food modal.
when newAlcinputs runs then hides modals and brings up alc modal. when submit alc modal then empty and hide.

empties food andalcohol modal on click of modal buttons.
when click alcohol addtl info submit button then close modal. 
each submit button for food and alcohol sends info and then empties after.

move new pairings to middle, at bottom of jumbotron

staff favorites
hardcode pics and stuff