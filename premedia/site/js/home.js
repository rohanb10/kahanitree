

function toggleMenu(icon) {
	$('#menu, .menu-underlay').toggleClass('active');
	icon.classList.toggle('active');
}


// Animation observer
// observer = new IntersectionObserver(entries => entries.forEach(e => {if (e.intersectionRatio > 0) animate(e.target)}),{threshold:.33});
// document.querySelectorAll('[data-anim]').forEach(i => observer.observe(i))

// animate = item => {
// 	observer.unobserve(item);
// 	item.style.animationDelay = item.getAttribute('data-delay') || '0s';
// 	item.classList.add('animated', item.getAttribute('data-anim'))
// 	item.querySelectorAll('[data-child]').forEach(c => {
// 		c.style.animationDelay = c.getAttribute('data-delay') || '0s';
// 		c.classList.add('animated', c.getAttribute('data-child'))
// 	})
// }

var animationObserver = new IntersectionObserver(animateItems, {threshold:.33});
function animateItems(entries) {
	entries.forEach(e => {
		if (e.intersectionRatio > 0) {
			var item = e.target;
			animationObserver.unobserve(item);
			// get data attributes (and then child attributes) from each item and apply them to css
			item.style.animationDelay = item.getAttribute('data-delay') || '0s';
			item.classList.add('animated', item.getAttribute('data-anim'))
			item.querySelectorAll('[data-child]').forEach(c => {
				c.style.animationDelay = c.getAttribute('data-delay') || '0s';
				c.classList.add('animated', c.getAttribute('data-child'))
			})
		}
	});
}

var navbarObserver = new IntersectionObserver(toggleNavbarColour, {
	threshold: Array.from(Array(101), (v,i) => parseFloat((i/100).toPrecision(2))), 
	// rootMargin: '50px'
});
function toggleNavbarColour(entries) {

	var logo = document.getElementById('logo')
	var isInDarkBg = entries.some(e => e.intersectionRatio > 0 && e.intersectionRatio <= 1 && e.boundingClientRect.top < 70)
	logo.classList.toggle('dark', isInDarkBg)
	// console.log(expression);
	// if (isInDarkBg) console.log(entries.find(e => e.intersectionRatio > 0 && e.intersectionRatio < 1).target)
	entries.forEach(e => {
		if (e.target === document.querySelector('.half.bg-web')) console.log(e.intersectionRatio, e);
		// logo.classList.toggle('dark', e.intersectionRatio > 0.1 && e.intersectionRatio <= 1 && e.boundingClientRect.top < 70)
	})
}
// navbarObserver.observe(document.getElementById('hi'));
document.querySelectorAll('.section.bg-dark, .bg-web, .navbar').forEach(bg => navbarObserver.observe(bg))
// navbarObserver.observe(document.querySelector('.section.bg-dark'))


document.querySelectorAll('[data-anim]').forEach(i => animationObserver.observe(i))
// End animation observer

// End animation observer


// MAP
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

function renderMap() {
	$('#map').vectorMap({
		map: 'world_mill',
		markers: COUNTRIES,
		backgroundColor: 'rgba(0,0,0,0)',
		zoomMax: 1.2, zoomMin: 1.2, zoomOnScroll: false,
		regionStyle: {
			initial: {
				'fill': '#6090CE', 'fill-opacity': 0.8,
			},
			hover: {
				'fill': '#6090CE', 'cursor': 'initial',
			}
		},
		markerStyle: {
			initial: {
				fill: '#D83F5A', stroke: '#D83F5A', r: 4,
			},
			hover: {
				'fill': '#D83F5A'
			}
		},
		focusOn: {
			x: 0.5, y: 0.5, scale: 1.1,
		},
		// onRegionTipShow: function(e){e.preventDefault()},
		// // Intercept the tooltip shown on hover by adding company name
		// onMarkerTipShow: function(e, tip, code){
		// 	tip[0].innerHTML = '<div class="country-name">'+ COUNTRIES[code].name + '</div><div>' + COUNTRIES[code].details + '</div>';
		// },
	});
}
renderMap();