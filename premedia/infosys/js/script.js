$(document).ready(function(){
	$('.navbar button, #navigation button').click(function() {
		$('#navigation, body').toggleClass('nav-open')
	})
});