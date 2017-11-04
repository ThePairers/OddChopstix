$(document).ready(function() {
var postModalClone = $("#newPairingModal").clone(); // Do this on $(document).ready(function() { ... })


// initiate slick carousel
var prevArrow = "<button type='button' class='slick-prev pull-left'><i class='fa fa-arrow-circle-left fa-3' aria-hidden='true'></i></button>"
var nextArrow = "<button type='button' class='slick-next pull-right'><i class='fa fa-arrow-circle-right fa-3' aria-hidden='true'></i></button>"
$('.multiple-items').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  prevArrow: prevArrow,
  nextArrow: nextArrow
});

$('#newPairingModal').on('hide.bs.modal', function(event) {
	// Use this command if you want to keep divClone as a copy of "#some_div"
	$("#newPairingModal").replaceWith(postModalClone.clone()); // Restore element with a copy of divClone

})

});


