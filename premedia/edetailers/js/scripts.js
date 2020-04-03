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
});

// fullpage_api.setAllowScrolling(true);

$('.slider').bbslider({
	auto: true,
	timer: 4000,
	loop: true,
	duration: 666,
	pager: true,
	pagerWrap: '.pager'
});

/*
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
*/
// const COUNTRIES = ['ch', 'gb', 'at', 'dk', 'de', 'fr', 'ie', 'mx', 'ar', 'sg', 'kr', 'my', 'be', 'hk', 'au', 'us', 'za'];

google.charts.load('current', {
	'packages':['geochart'],
	'mapsApiKey': 'AIzaSyCAaVmcBfrA0mCjIVl0ljNBhCh4Ciy2mOk'
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
	var options = {
		backgroundColor: {strokeWidth: '3px'},
		colorAxis: {colors: ['#3A3A9D']}, // $darkBlue
		displayMode: 'markers',
		domain: 'IN',
		magnifyingGlass: {enable: true, zoomFactor: 3},
		tooltip: {textStyle: {color: '#000'},showColorCode: true},
		sizeAxis: {maxSize: 5},
		legend: 'none'
	}
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Country');
	data.addColumn('number', 'Value');
	data.addColumn({type:'string', role:'tooltip', p: {html: true}});


	data.addRows([
		[{v: 'Switzerland',f:'Switzerland'}, 5, 'Company 231'],
		[{v: 'United Kingdom',f:'United Kingdom'}, 5, 'Company 2314'],
		[{v: 'Austria',f:'Austria'}, 5, 'Company 2231'],
		[{v: 'Denmark',f:'Denmark'}, 5, 'Company 2351'],
		[{v: 'Germany',f:'Germany'}, 5, 'Company 2u31'],
		[{v: 'France',f:'France'}, 5, 'Company 2231'],
		[{v: 'Ireland',f:'Ireland'}, 5, 'Company 23b1'],
		[{v: 'Mexico',f:'Mexico'}, 5, 'Company 2g31'],
		[{v: 'Argentina',f:'Argentina'}, 5, 'Company 231333'],
		[{v: 'Singapore',f:'Singapore'}, 5, 'Company 2ff31'],
		[{v: 'South Korea',f:'South Korea'}, 5, 'Company 234441'],
		[{v: 'Malaysia',f:'Malaysia'}, 5, 'Company 20931'],
		[{v: 'Belgium',f:'Belgium'}, 5, 'Company 232321'],
		[{v: 'Hong Kong',f:'Hong Kong'}, 5, 'Company 211131'],
		[{v: 'Australia',f:'Australia'}, 5, 'Company 2551'],
		[{v: 'United States',f:'United States'}, 5, 'Company 231444'],
		[{v: 'South Africa',f:'South Africa'}, 5, 'Company hello there'],
	]);

	var chart = new google.visualization.GeoChart(document.getElementById('gmap'));
	chart.draw(data, options);

}

function openCertModal(element, certName) {
	const rect = element.getBoundingClientRect();
	var cords = {x: window.scrollX + (rect.left + rect.right) / 2 , y: window.scrollY + (rect.top + rect.bottom) / 2};
	createCircleAnimation(cords);
	$(element).addClass('active');
	
	$('#cert-modal').css({'display':'flex', 'animation-name':'circle-in'});
	$('#'+certName).css({'display':'block'});
	$('.modal-content').delay(600).fadeIn(300);
	$('body').addClass('dark-bg');
}
function closeCertModal() {
	$('.modal-content, #veeva, #oce, #econtent').fadeOut(300);
	$('#cert-modal').delay(150).css({'animation-name':'circle-out'});
	$('.cert-logo-container').removeClass('active');
	$('body').removeClass('dark-bg');
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