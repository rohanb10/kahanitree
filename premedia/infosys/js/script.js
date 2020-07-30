$(document).ready(function(){
	$('.navbar button, #navigation button').click(function() {
		$('#navigation, body').toggleClass('nav-open')
	});
	$('#search-modal').on('shown.bs.modal', function () {
		$('#search-input').trigger('focus')
	})
});