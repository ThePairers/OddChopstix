$(document).ready(function() {

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

// post modal
// logic: searches in food, if postfood runs then changes modal to have input which(function) sends back to post modal

});