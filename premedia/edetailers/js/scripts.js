// remove hash from url
history.pushState('', '', window.location.pathname);

// Escape key closes modal
function escapeToClose(e) {
	if (e.keyCode == 27) {
		closeCertModal();
	}
}

// Open certification modal + animation
function openCertModal(element, certName) {
	const rect = element.getBoundingClientRect();
	var cords = {x: window.scrollX + (rect.left + rect.right) / 2 , y: window.scrollY + (rect.top + rect.bottom) / 2};
	createCircleAnimation(cords);
	$(element).addClass('active');
	$('#cert-modal').addClass('active').css({'display':'flex', 'animation-name':'circle-in'});
	$('#'+certName).css({'display':'block'});
	$('.nav-container').addClass('dark-bg');
	$('.modal-content').delay(600).fadeIn(300);
	$('.nav-item').fadeOut(100);
	document.addEventListener('keydown', escapeToClose);
}

// close certification modal + animation
function closeCertModal() {
	$('.modal-content, #veeva, #oce, #mitouch').fadeOut(300);
	$('#cert-modal').delay(150).css({'animation-name':'circle-out'}).delay(700).toggle(1);
	$('.cert-logo-container').removeClass('active');
	$('.nav-container').removeClass('dark-bg');
	$('.nav-item').delay(300).fadeIn(300);
	document.removeEventListener('keydown', escapeToClose);
}

// create css animation keyframes based on the div position relative to the screen
function createCircleAnimation(cords) {
	var xy = cords.x + 'px ' + cords.y + 'px';
	$.keyframe.define([{
		name: 'circle-in',
		from: {'clip-path': 'circle(  0% at '+ xy + ')', '-webkit-clip-path': 'circle(  0% at '+ xy + ')', '-ms-clip-path': 'circle(  0% at '+ xy + ')'},
		to:   {'clip-path': 'circle(120% at '+ xy + ')', '-webkit-clip-path': 'circle(120% at '+ xy + ')', '-ms-clip-path': 'circle(120% at '+ xy + ')'},
	}]);
	$.keyframe.define([{
		name: 'circle-out',
		from: {'clip-path': 'circle(120% at '+ xy + ')', '-webkit-clip-path': 'circle(120% at '+ xy + ')', '-ms-clip-path': 'circle(120% at '+ xy + ')'},
		to:   {'clip-path': 'circle(  0% at '+ xy + ')', '-webkit-clip-path': 'circle(  0% at '+ xy + ')', '-ms-clip-path': 'circle(  0% at '+ xy + ')'},
	}]);
}

function howWeWorkHandler(el, id) {
	$('.work-selector span').removeClass('active');
	$(el).delay(300).addClass('active');
	if (id === 'model') {
		$('#process').fadeOut(300);
		$('#model').css('display','flex').hide().delay(300).fadeIn(300);
	} else {
		$('#model').fadeOut(300);
		$('#process').css('display','flex').hide().delay(300).fadeIn(300);
	}
}

// Map / Clients section
const COUNTRIES = [
	{latLng: [ 46.82,   8.23], name: 'Switzerland', details: 'eDetailing, Website Development, Emailers'},
	{latLng: [  1.35, 103.82], name: 'Singapore', details: 'eDetailing, Emailers'},
	{latLng: [ 25.03, 121.57], name: 'Taiwan', details: 'eDetailing, Emailers'},
	{latLng: [ -33.92, 18.42], name: 'South Africa', details: 'eDetailing'},
	{latLng: [ 51.51,   0.13], name: 'United Kingdom', details: 'eDetailing, Website Development'},
	{latLng: [ 47.51,  14.55], name: 'Austria', details: 'Website Development, Emailers'},
	{latLng: [ 19.43, -99.13], name: 'Mexico', details: 'eDetailing, Emailers'},
	{latLng: [ 56.26,   9.50], name: 'Denmark', details: 'Website Development'},
	{latLng: [-22.91, -43.17], name: 'Brazil', details: 'Emailers'},
	{latLng: [ 52.52,  13.40], name: 'Germany', details: 'Website Development'},
	{latLng: [ 22.32, 114.17], name: 'Hong Kong', details: 'eDetailing'},
	{latLng: [ 46.23,   2.21], name: 'France', details: 'eDetailing, Emailers'},
	{latLng: [ -37.81,144.96], name: 'Australia', details: 'eDetailing, Emailers'},
	{latLng: [ 53.14,  -7.69], name: 'Ireland', details: 'Emailers'},
	{latLng: [ 40.42,  -3.70], name: 'Spain', details: 'eDetailing'},
	{latLng: [ 37.57, 126.98], name: 'South Korea', details: 'eDetailing, Emailers'},
	{latLng: [ 40.06, -74.41], name: 'United States', details: 'eDetailing, Website Development'}, //NJ
	{latLng: [ 52.23,  21.01], name: 'Poland', details: 'Emailers'},
	{latLng: [  4.21, 101.98], name: 'Malaysia', details: 'eDetailing, Website Development, Emailers'},
	{latLng: [ 50.85,   4.35], name: 'Belgium', details: 'eDetailing, Emailers'},
]

// Render the map (jVectorMap 2.0.5)
function renderMap() {
	$('#jvectormap').vectorMap({
		map: 'world_mill',
		markers: COUNTRIES,
		backgroundColor: '#FFF',
		zoomMax: 4, zoomMin: 0.7, zoomOnScroll: false, zoomStep: 1.6,
		regionStyle: {
			initial: {
				'fill': '#c5c5c5', 'fill-opacity': 0.8,
			},
			hover: {
				'fill': '#c5c5c5', 'cursor': 'initial',
			}
		},
		markerStyle: {
			initial: {
				'fill': '#3A3A9D', 'fill-opacity': 0.8, 'stroke': '#83D0F4', 'r': 6,
			},
			hover: {
				'fill': '#3A3A9D', 'stroke': 'black'
			}
		},
		focusOn: {
			x: 0.5, y: 0.5, scale: 0.9,
		},
		onRegionTipShow: function(e){e.preventDefault()},
		// Intercept the tooltip shown on hover by adding company name
		onMarkerTipShow: function(e, tip, code){
			tip[0].innerHTML = '<div class="country-name">'+ COUNTRIES[code].name + '</div><div>' + COUNTRIES[code].details + '</div>';
		},
	});
}

// Clientside form validation
function validateContactForm(form){
	var invalidName = !form.name.value.match(/^[a-z ,.'-]+$/i);
	document.getElementById('error-name').innerHTML = invalidName ? 'Valid name required' : '&nbsp;';
	form.name.setAttribute('data-valid', (invalidName ? 'error' :''));

	var invalidEmail = !form.email.value.match(re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	document.getElementById('error-email').innerHTML = invalidEmail ? 'Valid email required' : '&nbsp;';
	form.email.setAttribute('data-valid', (invalidEmail ? 'error' :''));

	var invalidMessage = !form.message.value.match(/^[a-zA-Z0-9?$@#()'!,+\-=_:.&€£*%\s]+$/);
	if (form.message.value.length < 5) {
		document.getElementById('error-message').innerHTML = invalidMessage ? 'Message required' : '&nbsp;';
		form.message.setAttribute('data-valid', (invalidMessage ? 'error' :''));	
	} else {
		document.getElementById('error-message').innerHTML = invalidMessage ? 'No special characters allowed in message body' : '&nbsp;';
		form.message.setAttribute('data-valid', (invalidMessage ? 'error' :''));	
	}
	// everything is valid. submit ajax request
	if (invalidName === false && invalidEmail === false  && invalidMessage === false) {
		// change button to loading state
		// submit ajax request

		//success
		// form.classList.add('success')

		// error
		// change button to failure state
		// form.classList.add('failure')

	}
	return false;
}

//close hamburger when link is clicked;
function mobileNavigate(el) {
	document.location.hash = el.dataset.name;
	document.getElementById("hamburger").checked = false;
	setTimeout(function() {
		$('nav').addClass('scrolling');
	}, 300);
}

// After page completes loading
$(window).load(function() {
	$('.slider').bbslider({
		auto: true,
		timer: 4000,
		loop: true,
		duration: 666,
		pager: true,
		pagerWrap: '.pager'
	});
	this.checkScrollMethod();
	$('.slider').fadeTo(1,1);
	this.renderMap();
});