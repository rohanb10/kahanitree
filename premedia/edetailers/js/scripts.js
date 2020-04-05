// FullpageJS library load
new fullpage('#fullpage', {
	licenseKey:'8C4EBEC6-9FCF4B75-B31BA128-7DF9ADB6',
	autoScrolling:true,
	anchors: ['home', 'eDetailers', 'certifications','services', 'how-we-work', 'map','about', 'contact'],
	menu: '#navigation-menu',
	// navigation: true,
	// navigationTooltips: ['Home', 'eDetailers', 'Certifications','Services', 'How We Work', 'Map','About', 'Contact'],
	responsiveWidth: 600,
	paddingTop: '3em',
	slideSelector: null,
	bigSectionsDestination: 'top'
});

// Image slider (BareBonesSlider modified jQuery extension) in the hero/top section 
$('.slider').bbslider({
	auto: true,
	timer: 4000,
	loop: true,
	duration: 666,
	pager: true,
	pagerWrap: '.pager'
});

// Certifications section

	// Open modal animation
	function openCertModal(element, certName) {
		const rect = element.getBoundingClientRect();
		var cords = {x: window.scrollX + (rect.left + rect.right) / 2 , y: window.scrollY + (rect.top + rect.bottom) / 2};
		createCircleAnimation(cords);
		$(element).addClass('active');
		$('#cert-modal').addClass('active').css({'display':'flex', 'animation-name':'circle-in'});
		$('#'+certName).css({'display':'block'});
		$('body').addClass('dark-bg');
		$('.modal-content').delay(600).fadeIn(300);
		$('.nav-item').delay(300).fadeOut(100);
	}

	// close modal animation
	function closeCertModal() {
		$('.modal-content, #veeva, #oce, #econtent').fadeOut(300);
		$('#cert-modal').delay(150).css({'animation-name':'circle-out'});
		$('.cert-logo-container').removeClass('active');
		$('body').removeClass('dark-bg');
		$('.nav-item').delay(300).fadeIn(300);
	}

	// create css animation keyframes based on the div position relative to the screen
	function createCircleAnimation(cords) {
		var xy = cords.x + 'px ' + cords.y + 'px';
		$.keyframe.define([{
			name: 'circle-in',
			from: {'clip-path': 'circle(0% at '+ xy + ')', '-webkit-clip-path': 'circle(0% at '+ xy + ')'},
			to: {'clip-path': 'circle(100% at '+ xy + ')', '-webkit-clip-path': 'circle(100% at '+ xy + ')'},
		}]);
		$.keyframe.define([{
			name: 'circle-out',
			from: {'clip-path': 'circle(100% at '+ xy + ')', '-webkit-clip-path': 'circle(100% at '+ xy + ')'},
			to: {'clip-path': 'circle(0% at '+ xy + ')', '-webkit-clip-path': 'circle(0% at '+ xy + ')'},
		}]);
	}
// Certifications section end

function howWeWorkHandler(el, id) {
	$('.work-selector span').removeClass('active');
	$(el).addClass('active');
	if (id === 'model') {
		$('#model').addClass('active');
		$('#process').removeClass('active');
	} else {
		$('#process').addClass('active');
		$('#model').removeClass('active');
	}
}


// Map / Clients section
	const COUNTRIES = [
		{latLng: [ -33.92, 18.42], name: 'South Africa', company: 'CompanyName0'},
		{latLng: [ 46.82,   8.23], name: 'Switzerland', company: 'CompanyName1'},
		{latLng: [ 51.51,   0.13], name: 'United Kingdom', company: 'CompanyName2'},
		{latLng: [ 47.51,  14.55], name: 'Austria', company: 'CompanyName3'},
		{latLng: [ 56.26,   9.50], name: 'Denmark', company: 'CompanyName4'},
		{latLng: [ 52.52,  13.40], name: 'Germany', company: 'CompanyName5'},
		{latLng: [ 46.23,   2.21], name: 'France', company: 'CompanyName6'},
		{latLng: [ 53.14,  -7.69], name: 'Ireland', company: 'CompanyName7'},
		{latLng: [ 19.43, -99.13], name: 'Mexico', company: 'CompanyName8'},
		{latLng: [-34.60, -58.38], name: 'Argentina', company: 'CompanyName9'},
		{latLng: [  1.35, 103.82], name: 'Singapore', company: 'CompanyName10'},
		{latLng: [ 37.57, 126.98], name: 'South Korea', company: 'CompanyName11'},
		{latLng: [  4.21, 101.98], name: 'Malaysia', company: 'CompanyName12'},
		{latLng: [ 50.85,   4.35], name: 'Belgium', company: 'CompanyName13'},
		{latLng: [ 22.32, 114.17], name: 'Hong Kong', company: 'CompanyName14'},
		{latLng: [ -37.81,144.96], name: 'Melbourne, Australia', company: 'CompanyName15'},
		{latLng: [ 37.37,-122.04], name: 'United States', company: 'CompanyName16'},
	]

	// Render the map (jVectorMap 2.0.5)
	$(function(){
		$('#jvectormap').vectorMap({
			map: 'world_mill',
			backgroundColor: '#FFF',
			zoomMax: 4,
			zoomOnScroll: false,
			zoomStep: 1.6,
			regionStyle: {
				initial: {
					'fill': '#c5c5c5',
					'fill-opacity': 0.8,
				},
				hover: {
					'fill': '#c5c5c5',
					'cursor': 'initial',
				}
			},
			markerStyle: {
				'initial': {
					'fill': '#3A3A9D',
					'fill-opacity': 0.8,
					'stroke': '#83D0F4',
					'r': 6,
				},
				hover: {
					'fill': '#3A3A9D',
					'stroke': 'black'
				}
			},
			markers: COUNTRIES,
			onRegionTipShow: function(e){
				e.preventDefault();
			},
			// Intercept the tooltip shown on hover by adding company name
			onMarkerTipShow: function(e, tip, code){
				// console.log(tip[0], code);
				tip[0].innerHTML = '<div class="company-name">'+ COUNTRIES[code].company + '</div>' + tip[0].innerHTML ;
			},
		});
	});
// Map / Clients section end


// Block all css transitions until page fully loaded
$(window).load(function() {
	$("body").removeClass("preload");
});