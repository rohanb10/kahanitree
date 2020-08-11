new Chartist.Bar('#revenue', {
	labels: ['2016', '2017', '2018', '2019', '2020'],
	series: [[62411, 68484, 70522, 82675, 90791]],
}, {
	axisX: {
		showGrid: false,
	},
	axisY: {
		labelInterpolationFnc: function(value) {return '₹' + (value/1000) + 'k'}
	},
	low: 50000,
	seriesBarDistance: 0,
}).on('created', function() {
	connectTooltip('#revenue .ct-bar', 'money')
});

new Chartist.Line('#profit', {
	labels: ['2016', '2017', '2018', '2019', '2020'],
	series: [[12491, 14353, 16029, 15404, 16594]]
}, {
	axisY: {
		labelInterpolationFnc: function(value) {return '₹' + (value / 1000) + 'k'}
	},
	showArea: true,
	seriesBarDistance: -20,
}).on('created', function() {
	connectTooltip('#profit .ct-point', 'money')
});
new Chartist.Pie('#digital-revenue', {
	labels: [2018, 2019, 2020],
	series: [25.2, 31.2, 39.2]
}, {
	donut: true,
	donutWidth: 50,
	startAngle: 270,
	total: 192,
	showLabel: true,
});
new Chartist.Bar('#clients', {
	labels: [2016, 2017, 2018, 2019, 2020],
	series: [[1078, 1143, 1184, 1254, 1383],
			 [14, 19, 20, 25, 28]]
}, {
	axisX: {
		showGrid: false,
	},
	stackBars: true,
	low: 1050,
}).on('created', function() {
	connectTooltip('#clients .ct-bar', 'stacked')
});

function connectTooltip(selector, numType) {
	var data = $(selector);
	$(selector).hover(function() {
		$('#tooltip').css($(this).position());
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
	}, function() {
		$('#tooltip').removeClass('tooltip-show');
	});
}