new fullpage('#fullpage', {
	licenseKey:'8C4EBEC6-9FCF4B75-B31BA128-7DF9ADB6',
	autoScrolling:true,
	// anchors:['home', 'eDetailers', 'certifications','services', 'how-we-work', 'map','about', 'contact'],
	navigation: true,
	navigationTooltips: ['Home', 'eDetailers', 'Certifications','Services', 'How We Work', 'Map','About', 'Contact'],
	responsiveWidth: 600,
	css3: true,
	slideSelector: null,
	scrollbar: true,
});

fullpage_api.setAllowScrolling(true);

$('.slider').bbslider({
	auto: true,
	timer: 4000,
	loop: true,
	duration: 666,
	pager: true,
	pagerWrap: '.pager'
});


const COUNTRIES = ['ch', 'gb', 'at', 'dk', 'de', 'fr', 'ie', 'mx', 'ar', 'sg', 'kr', 'my', 'be', 'hk', 'au', 'us', 'za'];
$(document).ready(function() {
	$('#vmap').vectorMap({
		map: 'world_en',
		backgroundColor: '#fff',
		enableZoom: false,
		selectedRegions: COUNTRIES,
		selectedColor: '#83D0F4',
		borderColor: '#AAA',
		borderOpacity: 0.4,
		borderWidth: 1,
		hoverColor: '#3A3A9D',
		scaleColors: ['#b6d6ff', '#005ace'],
		pinMode: 'id',
		pins: {'au': 'au_pin'},
		onRegionClick: function(e, code){
			if (COUNTRIES.indexOf(code) == -1) {
				e.preventDefault();
			}
		},
		onRegionOver: function(e, code) {
			if (COUNTRIES.indexOf(code) == -1) {
				e.preventDefault();
			}
		},
		onLabelShow: function(e, label, code) {
			console.log(code);
			if (COUNTRIES.indexOf(code) == -1) {
				e.preventDefault();
			}
		}
	});
});

function openCertModal(el, certName) {
	const rect = el.getBoundingClientRect();
	var cords = {x: window.scrollX + (rect.left + rect.right) / 2, y: window.scrollY + (rect.top + rect.bottom) / 2};
	createCircleAnimation(cords);

	$('#'+certName).css({'display':'block'});

	$('#cert-modal').css({'display':'flex', 'animation-name':'circle-in'});
	$('.cert-content').css({'animation-name':'fade-in'});
	$('fp-nav').css({'display':'none'});
}
function closeCertModal() {
	$('.cert-content').css('animation-name','fade-out');
	$('#cert-modal').css({'animation-name':'circle-out'});
	$('fp-nav').css({'display':'block'});
	$('#veeva, #oce, #econtent').css({'display':'none'});
	// document.getElementById('cert-modal').style.animationName = "circle-out";
}

function createCircleAnimation(cords) {
	var xy = cords.x + 'px ' + cords.y + 'px';
	$.keyframe.define([{
		name: 'circle-in',
		from: {'clip-path': 'circle(0% at '+ xy + ')'},
		to: {'clip-path': 'circle(100% at '+ xy + ')'},
	}]);
	$.keyframe.define([{
		name: 'circle-out',
		from: {'clip-path': 'circle(100% at '+ xy + ')'},
		to: {'clip-path': 'circle(0% at '+ xy + ')'},
	}]);
}