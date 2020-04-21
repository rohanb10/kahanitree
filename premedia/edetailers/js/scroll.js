if (!isIE){

	// jQuery extension to check if element is on screen
	$.fn.isOnScreen = function() {
		var elementBottom = $(this).offset().top + $(this).outerHeight();
		var navbarHeight = $('.nav-logo').offset().top + $('.nav-logo').outerHeight();
		console.log($(this).selector, elementBottom, elementBottom > navbarHeight)
		return elementBottom > navbarHeight;
	};

	var now = Date.now || function() {
		return new Date().getTime();
	};

	// UnderscoreJS _.throttle(...) function
	function throttle(func, wait, options) {
		var timeout, context, args, result;
		var previous = 0;
		if (!options) options = {};

		var later = function() {
			previous = options.leading === false ? 0 : now();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};

		var throttled = function() {
			var _now = now();
			if (!previous && options.leading === false) previous = _now;
			var remaining = wait - (_now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = _now;
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};

		throttled.cancel = function() {
			clearTimeout(timeout);
			previous = 0;
			timeout = context = args = null;
		};

		return throttled;
	}

	// Scroll down to hide navbar, scroll up to show
	var lastScrollTop = 0; var delta = 5;
	var nav = $('nav')
	var navbarHeight = nav.outerHeight();
	function navbarHider() {
		var st = $('.scroll-snap-container').scrollTop();
		if (Math.abs(lastScrollTop - st) <= delta) {
			return;
		}
		if (st > lastScrollTop && st > navbarHeight) {
			nav.addClass('scrolling');
		} else {
			nav.removeClass('scrolling');
		}
		lastScrollTop = st;
	}

	var scrolling = false;
	var scrollInterval;
	function setScrollingInterval() {
		return setInterval(function(){
			if (scrolling) {
				navbarHider();
				scroll = false;
			}
		}, 250);
	}

	// Check whether to load desktop or mobile scroll handlers for navbar
	var sectionIDs = ['#home', '#eDetailers','#certifications','#services','#how-we-work','#map','#about','#contact'];
	function checkScrollMethod() {
		if(window.innerWidth > 768){
			$('.section').css('height', window.innerHeight);

			// remove pre-rendered classes so animations are possible
			$('.section').removeClass('rendered')

			$('.scroll-snap-container').unbind();
			clearInterval(scrollInterval);

			$('.scroll-snap-container').on('scroll', throttle(function() {
				for (var i = 0; i < sectionIDs.length; i++) {
					var section = $(sectionIDs[i]);
					// If section has already been rendered, end loop for performance;
					if (section.isOnScreen()) {
						// Start animations for .section
						section.addClass('animated');
						// Make navbar class active
						$('.nav-item').removeClass('active');
						$('.nav-item[data-name=' + sectionIDs[i] +']').addClass('active');
						// Change to dark navbar if applicable
						changeNavbarColor(section);
						break;
					}
				}
			}, 200));

			return false;
		} else {
			$('.section').css('height', 'initial');
			$('.scroll-snap-container').unbind();

			$('.scroll-snap-container').on('scroll', throttle(function() {
				scrolling = true;
			}, 100));
			scrollInterval = setScrollingInterval();

			return true;
		}
	}
	function changeNavbarColor(section) {
		if (section.hasClass('dark-bg')) {
			$('.nav-container').addClass('dark-bg');
		} else {
			$('.nav-container').removeClass('dark-bg');
		}
	}

	var resizeTimer;
	window.onresize = function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(checkScrollMethod, 1000)
	}
}