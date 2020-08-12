/*
Tipue Search 7.1
Copyright (c) 2019 Tipue
Tipue Search is released under the MIT License
http://www.tipue.com/search
*/
!function(e){e.fn.tipuesearch=function(t){var i=e.extend({contextBuffer:60,contextLength:60,contextStart:90,debug:!1,descriptiveWords:25,footerPages:3,highlightTerms:!0,imageZoom:!0,minimumLength:3,newWindow:!1,show:10,showContext:!0,showRelated:!0,showTime:!0,showTitleCount:!0,showURL:!0,wholeWords:!0},t);return this.each(function(){var t=0,a="";function s(e){var t=location.search,i=(new RegExp("[?|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(t)||[,""])[1].replace(/\+/g,"%20");try{i=decodeURIComponent(i)}catch(e){i=unescape(i)}return i||null}function r(s,c){window.scrollTo(0,0);var h="",o=!1,p=!1,l=!0,u=0,_=[],n=e("#tipue_search_input").val();n=n.replace(/\+/g," ").replace(/\s\s+/g," ");var g=(n=e.trim(n)).toLowerCase();(g.match('^"')&&g.match('"$')||g.match("^'")&&g.match("'$"))&&(l=!1);var d=g.split(" ");if(l){g="";for(var f=0;f<d.length;f++){for(var m=!0,v=0;v<tipuesearch_stop_words.length;v++)d[f]==tipuesearch_stop_words[v]&&(m=!1,p=!0);m&&(g=g+" "+d[f])}d=(g=e.trim(g)).split(" ")}else g=g.substring(1,g.length-1);if(g.length>=i.minimumLength){if(l){if(c){var w=g;for(f=0;f<d.length;f++)for(v=0;v<tipuesearch_replace.words.length;v++)d[f]==tipuesearch_replace.words[v].word&&(g=g.replace(d[f],tipuesearch_replace.words[v].replace_with),o=!0);d=g.split(" ")}var x=g;for(f=0;f<d.length;f++)for(v=0;v<tipuesearch_stem.words.length;v++)d[f]==tipuesearch_stem.words[v].word&&(x=x+" "+tipuesearch_stem.words[v].stem);d=x.split(" ");for(f=0;f<tipuesearch.pages.length;f++){var b=0,R=tipuesearch.pages[f].text;for(v=0;v<d.length;v++){if(i.wholeWords)var k=new RegExp("\\b"+d[v]+"\\b","gi");else k=new RegExp(d[v],"gi");if(-1!=tipuesearch.pages[f].title.search(k))b+=20*tipuesearch.pages[f].title.match(k).length;if(-1!=tipuesearch.pages[f].text.search(k))b+=20*tipuesearch.pages[f].text.match(k).length;if(tipuesearch.pages[f].tags)if(-1!=tipuesearch.pages[f].tags.search(k))b+=10*tipuesearch.pages[f].tags.match(k).length;if(-1!=tipuesearch.pages[f].url.search(k)&&(b+=20),0!=b)for(var L=0;L<tipuesearch_weight.weight.length;L++)tipuesearch.pages[f].url==tipuesearch_weight.weight[L].url&&(b+=tipuesearch_weight.weight[L].score);d[v].match("^-")&&(k=new RegExp(d[v].substring(1),"i"),-1==tipuesearch.pages[f].title.search(k)&&-1==tipuesearch.pages[f].text.search(k)&&-1==tipuesearch.pages[f].tags.search(k)||(b=0))}0!=b&&(_.push({score:b,title:tipuesearch.pages[f].title,desc:R,img:tipuesearch.pages[f].img,url:tipuesearch.pages[f].url,note:tipuesearch.pages[f].note}),u++)}}else for(f=0;f<tipuesearch.pages.length;f++){b=0,R=tipuesearch.pages[f].text,k=new RegExp(g,"gi");if(-1!=tipuesearch.pages[f].title.search(k))b+=20*tipuesearch.pages[f].title.match(k).length;if(-1!=tipuesearch.pages[f].text.search(k))b+=20*tipuesearch.pages[f].text.match(k).length;if(tipuesearch.pages[f].tags)if(-1!=tipuesearch.pages[f].tags.search(k))b+=10*tipuesearch.pages[f].tags.match(k).length;if(-1!=tipuesearch.pages[f].url.search(k)&&(b+=20),0!=b)for(L=0;L<tipuesearch_weight.weight.length;L++)tipuesearch.pages[f].url==tipuesearch_weight.weight[L].url&&(b+=tipuesearch_weight.weight[L].score);0!=b&&(_.push({score:b,title:tipuesearch.pages[f].title,desc:R,img:tipuesearch.pages[f].img,url:tipuesearch.pages[f].url,note:tipuesearch.pages[f].note}),u++)}if(0!=u){if(i.showTitleCount&&0==t){var T=document.title;document.title="("+u+") "+T,t++}if(1==u)h+='<div id="tipue_search_results_count">'+tipuesearch_string_4;else h+='<div id="tipue_search_results_count">'+u.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+" "+tipuesearch_string_5;if(i.showTime)h+=" ("+(((new Date).getTime()-startTimer)/1e3).toFixed(2)+" "+tipuesearch_string_14+")",i.showTime=!1;if(h+="</div>",i.showRelated&&l){var z="";v=0;for(f=0;f<tipuesearch_related.Related.length;f++)if(g==tipuesearch_related.Related[f].search){if(v||(h+='<div class="tipue_search_related">'+tipuesearch_string_10+": "),o&&(n=g),tipuesearch_related.Related[f].include)var C=n+" "+tipuesearch_related.Related[f].related;else C=tipuesearch_related.Related[f].related;z+='<a class="tipue_search_related_btn" id="'+C+'">'+tipuesearch_related.Related[f].related+"</a>, ",v++}v&&(z=z.slice(0,-2),h+=z+=".</div>")}o&&(h+='<div id="tipue_search_replace">'+tipuesearch_string_2+" "+g+". "+tipuesearch_string_3+' <a id="tipue_search_replaced">'+w+"</a></div>"),_.sort(function(e,t){return t.score-e.score});var E=0;i.imageZoom&&(h+='<div id="tipue_search_image_modal"><div class="tipue_search_image_close">&#10005;</div><div class="tipue_search_image_block"><a id="tipue_search_zoom_url"><img id="tipue_search_zoom_img"></a><div id="tipue_search_zoom_text"></div></div></div>');for(f=0;f<_.length;f++){if(E>=s&&E<i.show+s){if(h+='<div class="tipue_search_result">',h+='<div class="tipue_search_content_title"><a href="'+window.location.host+"/"+_[f].url+'"'+a+">"+_[f].title+"</a></div>",i.debug&&(h+='<div class="tipue_search_content_debug">Score: '+_[f].score+"</div>"),i.showURL){var W=window.location.host+"/"+_[f].url.toLowerCase();0==W.indexOf("http://")&&(W=W.slice(7)),h+='<div class="tipue_search_content_url"><a href="'+window.location.host+"/"+_[f].url+'"'+a+">"+W+"</a></div>"}if(_[f].img&&(i.imageZoom?h+='<div class="tipue_search_image"><img class="tipue_search_img tipue_search_image_zoom" src="'+_[f].img+'" alt="'+_[f].title+'" data-url="'+_[f].url+'"></div>':h+='<div class="tipue_search_image"><a href="'+window.location.host+"/"+_[f].url+'"'+a+'><img class="tipue_search_img" src="'+_[f].img+'" alt="'+_[f].title+'"></a></div>'),_[f].desc){var y=_[f].desc;if(i.showContext){d=g.split(" ");var P=_[f].desc.toLowerCase().indexOf(d[0]);if(P>i.contextStart){var $=y.substr(P-i.contextBuffer),B=$.indexOf(" ");$=y.substr(P-i.contextBuffer+B),($=e.trim($)).length>i.contextLength&&(y="... "+$)}}if(l){d=g.split(" ");for(v=0;v<d.length;v++)if(i.highlightTerms){var O=new RegExp("("+d[v]+")","gi");y=y.replace(O,"<h0011>$1<h0012>")}}else if(i.highlightTerms){O=new RegExp("("+g+")","gi");y=y.replace(O,'<span class="tipue_search_content_bold">$1</span>')}var S="",I=y.split(" ");if(I.length<i.descriptiveWords)S=y;else for(v=0;v<i.descriptiveWords;v++)S+=I[v]+" ";"."!=(S=e.trim(S)).charAt(S.length-1)&&(S+=" ..."),h+='<div class="tipue_search_content_text">'+(S=(S=S.replace(/h0011/g,'span class="tipue_search_content_bold"')).replace(/h0012/g,"/span"))+"</div>"}_[f].note&&(h+='<div class="tipue_search_note">'+_[f].note+"</div>"),h+="</div>"}E++}if(u>i.show){var U=Math.ceil(u/i.show),Z=s/i.show;if(i.footerPages<3&&(i.footerPages=3),h+='<div id="tipue_search_foot"><ul id="tipue_search_foot_boxes">',s>0&&(h+='<li role="navigation"><a class="tipue_search_foot_box" accesskey="b" id="'+(s-i.show)+"_"+c+'">'+tipuesearch_string_6+"</a></li>"),Z<=2){var q=U;U>i.footerPages&&(q=i.footerPages);for(v=0;v<q;v++)h+=v==Z?'<li class="current" role="navigation">'+(v+1)+"</li>":'<li role="navigation"><a class="tipue_search_foot_box" id="'+v*i.show+"_"+c+'">'+(v+1)+"</a></li>"}else{(q=Z+i.footerPages-1)>U&&(q=U);for(v=Z-1;v<q;v++)h+=v==Z?'<li class="current" role="navigation">'+(v+1)+"</li>":'<li role="navigation"><a class="tipue_search_foot_box" id="'+v*i.show+"_"+c+'">'+(v+1)+"</a></li>"}Z+1!=U&&(h+='<li role="navigation"><a class="tipue_search_foot_box" accesskey="m" id="'+(s+i.show)+"_"+c+'">'+tipuesearch_string_7+"</a></li>"),h+="</ul></div>"}}else h+='<div id="tipue_search_error">'+tipuesearch_string_8+"</div>"}else p?h+='<div id="tipue_search_error">'+tipuesearch_string_8+" "+tipuesearch_string_9+"</div>":1==i.minimumLength?h+='<div id="tipue_search_error">'+tipuesearch_string_11+"</div>":h+='<div id="tipue_search_error">'+tipuesearch_string_12+" "+i.minimumLength+" "+tipuesearch_string_13+"</div>";e("#tipue_search_content").hide().html(h).slideDown(200),e("#tipue_search_replaced").click(function(){r(0,!1)}),e(".tipue_search_related_btn").click(function(){e("#tipue_search_input").val(e(this).attr("id")),r(0,!0)}),e(".tipue_search_image_zoom").click(function(){e("#tipue_search_image_modal").fadeIn(300),e("#tipue_search_zoom_img").attr("src",this.src);var t=e(this).attr("data-url");e("#tipue_search_zoom_url").attr("href",t);var i=this.alt+'<div class="tipue_search_zoom_options"><a href="'+this.src+'" target="_blank">'+tipuesearch_string_15+'</a>&nbsp; <a href="'+t+'">'+tipuesearch_string_16+"</a></div>";e("#tipue_search_zoom_text").html(i)}),e(".tipue_search_image_close").click(function(){e("#tipue_search_image_modal").fadeOut(300)}),e(".tipue_search_foot_box").click(function(){var t=e(this).attr("id").split("_");r(parseInt(t[0]),t[1])})}i.newWindow&&(a=' target="_blank"'),s("q")&&(e("#tipue_search_input").val(s("q")),r(0,!0)),e(this).keyup(function(e){"13"==e.keyCode&&r(0,!0)})})}}(jQuery);

var tipuesearch_stop_words=["a","above","after","again","against","all","am","an","and","any","are","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"];var tipuesearch_replace={words:[{word:"tip",replace_with:"tipue"},{word:"javscript",replace_with:"javascript"},{word:"jqeury",replace_with:"jquery"}]};var tipuesearch_weight={weight:[{url:"http://www.tipue.com",score:60},{url:"http://www.tipue.com/search",score:60},{url:"http://www.tipue.com/tipr",score:30},{url:"http://www.tipue.com/support",score:20}]};var tipuesearch_stem={words:[{word:"e-mail",stem:"email"},{word:"javascript",stem:"jquery"},{word:"javascript",stem:"js"}]};var tipuesearch_related={Related:[{search:"tipue",related:"Search",include:1},{search:"tipue",related:"jQuery"},{search:"tipue",related:"Blog"},{search:"tipue",related:"Support"},{search:"tipue search",related:"Demo",include:1},{search:"tipue search",related:"Support"}]};var tipuesearch_string_1="No title";var tipuesearch_string_2="Showing results for";var tipuesearch_string_3="Search instead for";var tipuesearch_string_4="1 result";var tipuesearch_string_5="results";var tipuesearch_string_6="<";var tipuesearch_string_7=">";var tipuesearch_string_8="Nothing found.";var tipuesearch_string_9="Common words are largely ignored.";var tipuesearch_string_10="Related";var tipuesearch_string_11="Search should be one character or more.";var tipuesearch_string_12="Search should be";var tipuesearch_string_13="characters or more.";var tipuesearch_string_14="seconds";var tipuesearch_string_15="Open Image";var tipuesearch_string_16="Goto Page";var startTimer=(new Date).getTime();
var tipuesearch = {"pages": []};
$(document).ready(function(){
	$('.search').click(function() {
		$('body').append('<div id="search-modal" class="modal fade"><div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Search this website</h5><button class="close" data-dismiss="modal"><span>&times;</span></button></div><div class="modal-body"><form class="form-inline"><span class="form-group"><input type="search" id="tipue_search_input" class="form-control" placeholder="eg. balance sheet, auditors report ..."></span><button id="tipue_search_submit" class="btn btn-primary mb-2">Search</button></form><div id="tipue_search_content"></div></div></div></div></div>')
		$('#search-modal').modal();

		$('#search-modal').on('shown.bs.modal', function() {
			$('#tipue_search_input').trigger('focus');
			$('#tipue_search_input').tipuesearch({imageZoom: false,showTime: false,showTitleCount: false,showURL: false,wholeWords: false});
		});
		$('#search-modal').on('hide.bs.modal', function() {$('#tipue_search_input').val('');$('#tipue_search_content').html('')});

		$('#tipue_search_submit').click(function(e) {$('#tipue_search_input').trigger(jQuery.Event("keyup", {keyCode: 13}))});
		$('#tipue_search_input').submit(function(e) {e.preventDefault()})
	})
});
/*
End Tipue Search
*/

function countUpNum(el, i) {
	var num = $(el).data('num');
	var countUp = new CountUp($(el).attr('id'), num, {
		useEasing: false,
		duration: 2,
		decimalPlaces: num.toString().indexOf('.') > -1 ? 2 : 0,
		formattingFn: function (n) {
			n = n.toString();
			if (n.indexOf('.') > -1){
				return n + (n.substring(n.indexOf('.') + 1).length === 1 ? '0' : '');
			}
			return parseFloat(n).toLocaleString('en-IN');
		}
	});
	$(el).delay(i*250).queue(function(){countUp.start()});
}

function setUpCountUp() {
	if (('#figures').length === 0) return;
	var windowY = $(window).height()
	if ($(window).width() > 768) {
		$('.homepage-wrapper').scroll(function(e) {
			if ($('#figures > div:nth-of-type(2)').offset().top < windowY) {
				$('#figures h1').each(function(i) {countUpNum(this, i)})
				$('.homepage-wrapper').unbind('scroll');
			}
		})
	} else {
		$(window).scroll(function() {
			if ($('#figures > div:nth-of-type(2)').offset().top - windowY/2 < $(window).scrollTop()) {
				$('#figures h1').each(function(i) {countUpNum(this, i)})
				$(window).unbind('scroll');
			}
		})
	}
}

$(document).ready(function(){
	$('.navbar button').click(function(e) {
		$('#navigation, body').addClass('nav-open');
		$('.hide-on-scroll').addClass('scrolling-up');
		$('body > div:not(.navbar)').click(function(e){
			$('#navigation button').click();
		})
	});
	$('#navigation button').click(function() {
		$('#navigation, body').removeClass('nav-open');
	});
	if ($('.hide-on-scroll').length > 0) {
		var scrollY = 0;
		$(window).scroll(function() {
			var currentY = $(window).scrollTop();
			$('.hide-on-scroll').toggleClass('scrolling-up', currentY < scrollY || scrollY < 60)
			scrollY = currentY;
		});
	}
	$('.article-control').click(function(){
		$('div[data-article-body]').addClass('d-none');
		$(`div[data-article-body=${$(this).data('article-id')}]`).removeClass('d-none');

		$('.article-control').removeClass('active');
		$(this).addClass('active');
	})
	setUpCountUp();
});