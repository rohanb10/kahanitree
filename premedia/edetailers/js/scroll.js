if (!isIE){
	var sectionIDs = ['#home', '#eDetailers','#certifications','#services','#how-we-work','#map','#about','#contact'];

	// jQuery extension to check if element is on screen
	$.fn.isOnScreen = function() {
		var elementBottom = $(this).offset().top + $(this).outerHeight();
		var navbarHeight = $('.nav-logo').offset().top + $('.nav-logo').outerHeight();
		// console.log($(this).selector, elementBottom, elementBottom > navbarHeight)
		return elementBottom > navbarHeight;
	};

	function animateNextSection (currentSectionIndex) {
		if (currentSectionIndex + 1 >= sectionIDs.length) {
			return false;
		}
		var currentSection = $(sectionIDs[currentSectionIndex]);
		var nextSection = $(sectionIDs[currentSectionIndex + 1]);
		var trigger = currentSection.scrollTop() + currentSection.outerHeight()/2;
		var nextTop = nextSection.offset().top;
		// console.log(currentSection.selector, trigger, nextSection.selector, nextTop);
		if  (trigger > nextTop){
			nextSection.addClass('animated');
			return true;
		}
		return false;
	};

	// close hamburger when link is clicked;
	function mobileNavigate(el) {
		document.location.hash = el.dataset.name;
		document.getElementById("hamburger").checked = false;
		setTimeout(function() {
			$('nav').addClass('scrolling');
		}, 300);
	}

	// animate all sections above clicked nav-link
	function desktopNavigate(el, location = null) {
		var sectionName = el === null ? location : el.dataset.name;
		var currentSectionIndex = sectionIDs.indexOf(sectionName);
		if (!$(sectionIDs[currentSectionIndex]).hasClass('animated')) {
			for (var i = 0; i <= currentSectionIndex; i++) {
				$(sectionIDs[i]).addClass('animated');
			}
		}
		if (location) {
			window.location = location;
		}
	}

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

					// Change navbar when directly over section
					if (section.isOnScreen()) {
						$('.nav-item').removeClass('active');
						$('.nav-item[data-name="' + sectionIDs[i] +'"]').addClass('active');
						changeNavbarColor(section);
						break;
					}
				}
				// Start animations for section when more than halfway past the last one
				for (var i = 0; i < sectionIDs.length - 1; i++) {
					var nextSection = $(sectionIDs[i+1])
					if (nextSection && !nextSection.hasClass('animated')) {
						animateNextSection(i);
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
		var nav = $('nav')
		if (section.hasClass('dark-bg') && !nav.hasClass('dark-bg')) {
			nav.removeClass('grey-bg').addClass('dark-bg');
		} else if (section.hasClass('grey-bg') && !nav.hasClass('grey-bg') && !$('#cert-modal').hasClass('active')) {
			nav.removeClass('dark-bg').addClass('grey-bg');
		} else if (!section.hasClass('dark-bg') && !section.hasClass('grey-bg')) {
			nav.removeClass('dark-bg grey-bg');
		}
	}

	var resizeTimer;
	window.onresize = function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(checkScrollMethod, 1000)
	}
}