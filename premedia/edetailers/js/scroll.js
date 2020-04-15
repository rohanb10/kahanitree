// Use IntersectionObserver for desktop scrolling (add .active class to navbar)
// observe page position for animations
if (!isIE){
	// Callback for IntersectionObserver event
	const callback = function (entries) {
		entries.forEach(function (entry) {
			const {target} = entry;
			if (entry.intersectionRatio >= 0.01) {
				if (target.classList.contains('dark-bg')) {
					$('.nav-container').addClass('dark-bg');
				} else {
					$('.nav-container').removeClass('dark-bg');
				}
				target.classList.add('animated');
				$('.nav-item').removeClass('active');
				$('.nav-item[data-name=' + target.id +']').addClass('active');
			}
		});
	}
	const observer = new IntersectionObserver(callback, {
		threshold: 0.01
	});

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

	// Check whether to load desktop or mobile handlers for navbar
	function checkScrollMethod() {
		if(window.innerWidth > 768){
			$('.section').css('height', window.innerHeight);
			document.querySelectorAll('.section').forEach(function (section, index){
				observer.observe(section)
			});
			//destroy scroll listener
			$('.scroll-snap-container').unbind();
			clearInterval(scrollInterval);
			return false;
		} else {
			$('.scroll-snap-container').scroll(function(){
				scrolling = true;
			});
			scrollInterval = setScrollingInterval();
			observer.disconnect()
			return true;
		}
	}

	var resizeTimer;
	window.onresize = function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(checkScrollMethod, 1000)
	}
}