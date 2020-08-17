var revenue = new Chartist.Bar('#revenue', {
	labels: ['2016', '2017', '2018', '2019', '2020'],
	series: [[62411, 68484, 70522, 82675, 90791]],
}, {
	axisX: {
		showGrid: false,
	},
	axisY: {
		position: 'start',
		labelInterpolationFnc: function(value) {return '₹' + (value/1000) + 'k'}
	},
	low: 50000,
	fullWidth: true,
	seriesBarDistance: 0,
}).on('created', function() {
	connectTooltip('#revenue .ct-bar', 'money', '#e8913a')
}).on('draw', function(el) {
	setupStrokeAnimations(el);
})

new Chartist.Line('#profit', {
	labels: ['2016', '2017', '2018', '2019', '2020'],
	series: [[12491, 14353, 16029, 15404, 16594]]
}, {
	axisY: {
		position: 'start',
		labelInterpolationFnc: function(value) {return '₹' + (value / 1000) + 'k'}
	},
	showArea: true,
	fullWidth: true,
}).on('created', function() {
	connectTooltip('#profit .ct-point', 'money', '#1757A6')
}).on('draw', function(el) {
	setupStrokeAnimations(el);
});

function setupStrokeAnimations(el) {
	if(el.type === 'line' || el.type === 'bar') {
		var length = el.element._node.getTotalLength();
		$(el.element._node).css({strokeDasharray: length, strokeDashoffset: length})
	}
}

function connectTooltip(selector, numType, bgColor = '#1757A6') {
	var data = $(selector);
	$(selector).hover(function() {
		$('#tooltip').css($(this).position());
		$('#tooltip').css({'backgroundColor': bgColor, 'borderTopColor': bgColor});

		var num = $(this).attr('ct:value');
		if (numType === 'money') {
			num = '₹' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' cr';
		} else if (numType === 'stacked' && $(this).parent().next().length > 0) {
			num = parseInt(num) + parseInt(($(this).parent().next().children().eq($(this).index()).attr('ct:value')));
			num = num + ' clients';
		} else {
			num = num + ' clients<br>($100 million+)';
		}
		
		$('#tooltip').html('<span>' + num + '</span>');
		$('#tooltip').addClass('tooltip-show');
	}, function(e) {
		if (selector.indexOf('ct-point') > -1) {
			trackMouseForTooltip(e.pageX, e.pageY);
		} else {
			$('#tooltip').removeClass('tooltip-show');	
		}
	});
}

function trackMouseForTooltip(x,y) {
	$(document).bind('mousemove', function(event) {
		if (Math.abs(event.pageX - x) > 10 ||  Math.abs(event.pageY - y) > 10) {
			$(document).off('mousemove');
			$('#tooltip').removeClass('tooltip-show');
		}
    });
}

function showGraphOnScroll() {
	var threshold = $(window).height() * .75;
	$(document).scroll(function(){
		if($(this).scrollTop() >= $('#revenue').offset().top - threshold) {
			$("#revenue").addClass('animate');
		}
		if($(this).scrollTop() >= $('#profit').offset().top - threshold) {
			$("#profit").addClass('animate');
			$(document).unbind('scroll');
		}
	});
}
showGraphOnScroll()