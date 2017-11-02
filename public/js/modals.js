$(document).ready(function() {

// opens modals //////
var newPairingModal = $('#new-pairing-modal');
var openPostModalBtn = $('#post-modal-btn');
var allModals = $('.modal');
var closeModalBtn = $('.close-modal');

// When the user clicks on the button, open the modal 
$('#new-pairing-btn').on('click', function(event) {
		event.preventDefault();
    $('#new-pairing-modal').css('display', "block");
});

// When the user clicks on <span> (x), close the modal
$('.close-modal').on('click', function(event) {
		event.preventDefault();
    $('#new-pairing-modal').css('display', "none");
});

// When the user clicks anywhere outside of the modal, close it
// window.on('click', function(event) {
//     if (event.target == allModals) {
//         allModals.style.display = "none";
//     };
// });

});