/*
Tipue Search 7.1
Copyright (c) 2019 Tipue
Tipue Search is released under the MIT License
http://www.tipue.com/search
*/
!function(e){e.fn.tipuesearch=function(t){var i=e.extend({contextBuffer:60,contextLength:60,contextStart:90,debug:!1,descriptiveWords:25,footerPages:3,highlightTerms:!0,imageZoom:!0,minimumLength:3,newWindow:!1,show:10,showContext:!0,showRelated:!0,showTime:!0,showTitleCount:!0,showURL:!0,wholeWords:!0},t);return this.each(function(){var t=0,a="";function s(e){var t=location.search,i=(new RegExp("[?|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(t)||[,""])[1].replace(/\+/g,"%20");try{i=decodeURIComponent(i)}catch(e){i=unescape(i)}return i||null}function r(s,c){window.scrollTo(0,0);var h="",o=!1,p=!1,l=!0,u=0,_=[],n=e("#tipue_search_input").val();n=n.replace(/\+/g," ").replace(/\s\s+/g," ");var g=(n=e.trim(n)).toLowerCase();(g.match('^"')&&g.match('"$')||g.match("^'")&&g.match("'$"))&&(l=!1);var d=g.split(" ");if(l){g="";for(var f=0;f<d.length;f++){for(var m=!0,v=0;v<tipuesearch_stop_words.length;v++)d[f]==tipuesearch_stop_words[v]&&(m=!1,p=!0);m&&(g=g+" "+d[f])}d=(g=e.trim(g)).split(" ")}else g=g.substring(1,g.length-1);if(g.length>=i.minimumLength){if(l){if(c){var w=g;for(f=0;f<d.length;f++)for(v=0;v<tipuesearch_replace.words.length;v++)d[f]==tipuesearch_replace.words[v].word&&(g=g.replace(d[f],tipuesearch_replace.words[v].replace_with),o=!0);d=g.split(" ")}var x=g;for(f=0;f<d.length;f++)for(v=0;v<tipuesearch_stem.words.length;v++)d[f]==tipuesearch_stem.words[v].word&&(x=x+" "+tipuesearch_stem.words[v].stem);d=x.split(" ");for(f=0;f<tipuesearch.pages.length;f++){var b=0,R=tipuesearch.pages[f].text;for(v=0;v<d.length;v++){if(i.wholeWords)var k=new RegExp("\\b"+d[v]+"\\b","gi");else k=new RegExp(d[v],"gi");if(-1!=tipuesearch.pages[f].title.search(k))b+=20*tipuesearch.pages[f].title.match(k).length;if(-1!=tipuesearch.pages[f].text.search(k))b+=20*tipuesearch.pages[f].text.match(k).length;if(tipuesearch.pages[f].tags)if(-1!=tipuesearch.pages[f].tags.search(k))b+=10*tipuesearch.pages[f].tags.match(k).length;if(-1!=tipuesearch.pages[f].url.search(k)&&(b+=20),0!=b)for(var L=0;L<tipuesearch_weight.weight.length;L++)tipuesearch.pages[f].url==tipuesearch_weight.weight[L].url&&(b+=tipuesearch_weight.weight[L].score);d[v].match("^-")&&(k=new RegExp(d[v].substring(1),"i"),-1==tipuesearch.pages[f].title.search(k)&&-1==tipuesearch.pages[f].text.search(k)&&-1==tipuesearch.pages[f].tags.search(k)||(b=0))}0!=b&&(_.push({score:b,title:tipuesearch.pages[f].title,desc:R,img:tipuesearch.pages[f].img,url:tipuesearch.pages[f].url,note:tipuesearch.pages[f].note}),u++)}}else for(f=0;f<tipuesearch.pages.length;f++){b=0,R=tipuesearch.pages[f].text,k=new RegExp(g,"gi");if(-1!=tipuesearch.pages[f].title.search(k))b+=20*tipuesearch.pages[f].title.match(k).length;if(-1!=tipuesearch.pages[f].text.search(k))b+=20*tipuesearch.pages[f].text.match(k).length;if(tipuesearch.pages[f].tags)if(-1!=tipuesearch.pages[f].tags.search(k))b+=10*tipuesearch.pages[f].tags.match(k).length;if(-1!=tipuesearch.pages[f].url.search(k)&&(b+=20),0!=b)for(L=0;L<tipuesearch_weight.weight.length;L++)tipuesearch.pages[f].url==tipuesearch_weight.weight[L].url&&(b+=tipuesearch_weight.weight[L].score);0!=b&&(_.push({score:b,title:tipuesearch.pages[f].title,desc:R,img:tipuesearch.pages[f].img,url:tipuesearch.pages[f].url,note:tipuesearch.pages[f].note}),u++)}if(0!=u){if(i.showTitleCount&&0==t){var T=document.title;document.title="("+u+") "+T,t++}if(1==u)h+='<div id="tipue_search_results_count">'+tipuesearch_string_4;else h+='<div id="tipue_search_results_count">'+u.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+" "+tipuesearch_string_5;if(i.showTime)h+=" ("+(((new Date).getTime()-startTimer)/1e3).toFixed(2)+" "+tipuesearch_string_14+")",i.showTime=!1;if(h+="</div>",i.showRelated&&l){var z="";v=0;for(f=0;f<tipuesearch_related.Related.length;f++)if(g==tipuesearch_related.Related[f].search){if(v||(h+='<div class="tipue_search_related">'+tipuesearch_string_10+": "),o&&(n=g),tipuesearch_related.Related[f].include)var C=n+" "+tipuesearch_related.Related[f].related;else C=tipuesearch_related.Related[f].related;z+='<a class="tipue_search_related_btn" id="'+C+'">'+tipuesearch_related.Related[f].related+"</a>, ",v++}v&&(z=z.slice(0,-2),h+=z+=".</div>")}o&&(h+='<div id="tipue_search_replace">'+tipuesearch_string_2+" "+g+". "+tipuesearch_string_3+' <a id="tipue_search_replaced">'+w+"</a></div>"),_.sort(function(e,t){return t.score-e.score});var E=0;i.imageZoom&&(h+='<div id="tipue_search_image_modal"><div class="tipue_search_image_close">&#10005;</div><div class="tipue_search_image_block"><a id="tipue_search_zoom_url"><img id="tipue_search_zoom_img"></a><div id="tipue_search_zoom_text"></div></div></div>');for(f=0;f<_.length;f++){if(E>=s&&E<i.show+s){h+='<div class="tipue_search_result">';var W=window.location.href.indexOf("live-enterprise/")>-1?"../":"";if(h+='<div class="tipue_search_content_title"><a href="'+W+_[f].url+'"'+a+">"+_[f].title+"</a></div>",i.debug&&(h+='<div class="tipue_search_content_debug">Score: '+_[f].score+"</div>"),i.showURL){var y=_[f].url.toLowerCase();0==y.indexOf("http://")&&(y=y.slice(7)),h+='<div class="tipue_search_content_url"><a href="'+W+_[f].url+'"'+a+">"+y+"</a></div>"}if(_[f].img&&(i.imageZoom?h+='<div class="tipue_search_image"><img class="tipue_search_img tipue_search_image_zoom" src="'+_[f].img+'" alt="'+_[f].title+'" data-url="'+_[f].url+'"></div>':h+='<div class="tipue_search_image"><a href="'+_[f].url+'"'+a+'><img class="tipue_search_img" src="'+_[f].img+'" alt="'+_[f].title+'"></a></div>'),_[f].desc){var P=_[f].desc;if(i.showContext){d=g.split(" ");var O=_[f].desc.toLowerCase().indexOf(d[0]);if(O>i.contextStart){var $=P.substr(O-i.contextBuffer),B=$.indexOf(" ");$=P.substr(O-i.contextBuffer+B),($=e.trim($)).length>i.contextLength&&(P="... "+$)}}if(l){d=g.split(" ");for(v=0;v<d.length;v++)if(i.highlightTerms){var S=new RegExp("("+d[v]+")","gi");P=P.replace(S,"<h0011>$1<h0012>")}}else if(i.highlightTerms){S=new RegExp("("+g+")","gi");P=P.replace(S,'<span class="tipue_search_content_bold">$1</span>')}var I="",U=P.split(" ");if(U.length<i.descriptiveWords)I=P;else for(v=0;v<i.descriptiveWords;v++)I+=U[v]+" ";"."!=(I=e.trim(I)).charAt(I.length-1)&&(I+=" ..."),h+='<div class="tipue_search_content_text">'+(I=(I=I.replace(/h0011/g,'span class="tipue_search_content_bold"')).replace(/h0012/g,"/span"))+"</div>"}_[f].note&&(h+='<div class="tipue_search_note">'+_[f].note+"</div>"),h+="</div>"}E++}if(u>i.show){var Z=Math.ceil(u/i.show),q=s/i.show;if(i.footerPages<3&&(i.footerPages=3),h+='<div id="tipue_search_foot"><ul id="tipue_search_foot_boxes">',s>0&&(h+='<li role="navigation"><a class="tipue_search_foot_box" accesskey="b" id="'+(s-i.show)+"_"+c+'">'+tipuesearch_string_6+"</a></li>"),q<=2){var D=Z;Z>i.footerPages&&(D=i.footerPages);for(v=0;v<D;v++)h+=v==q?'<li class="current" role="navigation">'+(v+1)+"</li>":'<li role="navigation"><a class="tipue_search_foot_box" id="'+v*i.show+"_"+c+'">'+(v+1)+"</a></li>"}else{(D=q+i.footerPages-1)>Z&&(D=Z);for(v=q-1;v<D;v++)h+=v==q?'<li class="current" role="navigation">'+(v+1)+"</li>":'<li role="navigation"><a class="tipue_search_foot_box" id="'+v*i.show+"_"+c+'">'+(v+1)+"</a></li>"}q+1!=Z&&(h+='<li role="navigation"><a class="tipue_search_foot_box" accesskey="m" id="'+(s+i.show)+"_"+c+'">'+tipuesearch_string_7+"</a></li>"),h+="</ul></div>"}}else h+='<div id="tipue_search_error">'+tipuesearch_string_8+"</div>"}else p?h+='<div id="tipue_search_error">'+tipuesearch_string_8+" "+tipuesearch_string_9+"</div>":1==i.minimumLength?h+='<div id="tipue_search_error">'+tipuesearch_string_11+"</div>":h+='<div id="tipue_search_error">'+tipuesearch_string_12+" "+i.minimumLength+" "+tipuesearch_string_13+"</div>";e("#tipue_search_content").hide().html(h).slideDown(200),e("#tipue_search_replaced").click(function(){r(0,!1)}),e(".tipue_search_related_btn").click(function(){e("#tipue_search_input").val(e(this).attr("id")),r(0,!0)}),e(".tipue_search_image_zoom").click(function(){e("#tipue_search_image_modal").fadeIn(300),e("#tipue_search_zoom_img").attr("src",this.src);var t=e(this).attr("data-url");e("#tipue_search_zoom_url").attr("href",t);var i=this.alt+'<div class="tipue_search_zoom_options"><a href="'+this.src+'" target="_blank">'+tipuesearch_string_15+'</a>&nbsp; <a href="'+t+'">'+tipuesearch_string_16+"</a></div>";e("#tipue_search_zoom_text").html(i)}),e(".tipue_search_image_close").click(function(){e("#tipue_search_image_modal").fadeOut(300)}),e(".tipue_search_foot_box").click(function(){var t=e(this).attr("id").split("_");r(parseInt(t[0]),t[1])})}i.newWindow&&(a=' target="_blank"'),s("q")&&(e("#tipue_search_input").val(s("q")),r(0,!0)),e(this).keyup(function(e){"13"==e.keyCode&&r(0,!0)})})}}(jQuery);

var tipuesearch_stop_words=["a","above","after","again","against","all","am","an","and","any","are","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"];var tipuesearch_replace={words:[{word:"tip",replace_with:"tipue"},{word:"javscript",replace_with:"javascript"},{word:"jqeury",replace_with:"jquery"}]};var tipuesearch_weight={weight:[{url:"http://www.tipue.com",score:60},{url:"http://www.tipue.com/search",score:60},{url:"http://www.tipue.com/tipr",score:30},{url:"http://www.tipue.com/support",score:20}]};var tipuesearch_stem={words:[{word:"e-mail",stem:"email"},{word:"javascript",stem:"jquery"},{word:"javascript",stem:"js"}]};var tipuesearch_related={Related:[{search:"tipue",related:"Search",include:1},{search:"tipue",related:"jQuery"},{search:"tipue",related:"Blog"},{search:"tipue",related:"Support"},{search:"tipue search",related:"Demo",include:1},{search:"tipue search",related:"Support"}]};var tipuesearch_string_1="No title";var tipuesearch_string_2="Showing results for";var tipuesearch_string_3="Search instead for";var tipuesearch_string_4="1 result";var tipuesearch_string_5="results";var tipuesearch_string_6="<";var tipuesearch_string_7=">";var tipuesearch_string_8="Nothing found.";var tipuesearch_string_9="Common words are largely ignored.";var tipuesearch_string_10="Related";var tipuesearch_string_11="Search should be one character or more.";var tipuesearch_string_12="Search should be";var tipuesearch_string_13="characters or more.";var tipuesearch_string_14="seconds";var tipuesearch_string_15="Open Image";var tipuesearch_string_16="Goto Page";var startTimer=(new Date).getTime();
var tipuesearch = {"pages": []};
$(document).ready(function(){
	$('body').append('<div id="search-overlay"><div class="container"><div class="search-bar"><input type="search" id="tipue_search_input" placeholder="Search"></div><div class="search-results"><div id="tipue_search_content"></div></div></div></div>')
	$('body .search').click(function(e) {
		if ($('body.search-open').length > 0){
			$('body').removeClass('search-open');
			$('body').unbind('keydown');
			$('#tipue_search_input').val('');
			$('#tipue_search_content').html('');
		} else {
			$('body').addClass('search-open');
			$('#tipue_search_input').focus();
		}
		$('#tipue_search_input').tipuesearch({imageZoom: false,showTime: false,showTitleCount: false,showURL: false,wholeWords: false});
		$('body').on('keydown', function(e) {
			if (e.which === 9) {
				e.preventDefault();
				e.stopPropagation();
				return false;
			}
			if (e.which === 27) {
				$('body').removeClass('search-open');
				$('body').unbind('keydown');
				$('#tipue_search_input').val('');
				$('#tipue_search_content').html('');
			}
		});
	});
});

var tipuesearch = {"pages": [
	{"title":"Intution | Live Enterprise | Annual Report 2020","url": "live-enterprise/intuition.html", "text":"Next-level instincts, intelligence, and intuition. Reimagining everyday decisions at Infosys Early in our journey to becoming an always resilient, evolving live enterprise, we recognized the need to build intuitive decision-making capabilities within a landscape of reimagined processes, experiences and digital infrastructure. This, we knew, would be vital for automating routine and deterministic decisions, while at the same time providing instant simulation capabilities for users to experiment and test in, before making more complex decisions about what and how to adapt in response to disruption. To facilitate this, we developed the Infosys Knowledge Graph that links employees, through a network of information, with a view into their skills sets, expertise, projects, innovations, industry solutions, IP and even relevant client associations. This is set within the larger context of near-realtime information of all interactions and business operations active within the Infosys ecosystem. We are working on overlaying this network with the Infosys Digital Brain so it can continuously read the Graph to determine trends and signals, and recommend responses that enable us to make critical adaptive decisions intuitively. This is making us more relevant to our clients. Leveraging the Infosys Knowledge Graph, our project teams now find the right fit talent for their project needs in real time. The AIbased talent‑matching service considers multiple factors like skills, adjacent skills, proficiency levels, prior experience working with a given client, talent connections with project team members and their readiness to start. If the best fit is not readily available, the Infosys Digital Brain, constantly monitoring the Infosys talent pipeline, alerts the project team automatically when the right fit is found. We are now extending this capability to our recruitment platform so we are able to quickly spot the availability of right fit talent pools outside of Infosys and bring them into our fold intuitively. For our employees, based on their professional career and learning aspirations, the Infosys Digital Brain automatically recommends the right courses and learning paths while connecting them to experts and communities that can support their upskilling journey and improve their relevance to clients. Perhaps the most empowering of them all, we are now using these capabilities to sense the changing needs of our clients in a post-COVID-19 world, based on their multichannel interactions with us. We relay this intelligence to our client partners in near real time along with recommendations for useful responses. Not surprisingly, our clients have expressed great interest in building similar capabilities to serve their own business contexts. Mohammed Rafee Tarafdar SVP – Unit Technology Officer Letting intuition run their business The human mind is wired to see patterns. It processes information in conjunction with insights from past experiences to create intuition. Intuition informs much of our decisions. Today, we are helping organizations develop a similar intuition to drive decisions swiftly, accurately and to act with resilience in the face of disruption. AI and automation lie at the core of this endeavor. For us, this manifests in an ecosystem of tools that captures and maps out complex and vast process environments. There begins our effort to reimagine and improve the way it all works. We rely on historical data, both qualitative and quantitative, to learn from and then guide the formation of patterns that help us to automatically detect, validate, classify and resolve problems. These patterns also help us see opportunities to get better at the things we already do. Our Bot Factory, with its repository of reusable microbots, helps us to quickly stitch together and automate the reengineered process landscape while bringing in self-service capabilities. We also partner with our clients to bring to them the advantages of AI and automation and build intuitive decisions and agile-action environments for their businesses. For one client, in the heavy engineering industry, we leveraged machine learning techniques including Deep Learning Neural Networks to help their experts improve underwater corrosion detection and assessment. We instituted data patterns and made it possible to predict leakages thereby ensuring a high degree of asset integrity and standards of safety. For a telecom client, we deployed AI techniques of prediction, time-series based event stitching, correlation analysis, text analysis and state transition models to improve order activation predictability. This greatly improved their customer experience, while lowering operational costs and accelerating revenue realization. We optimized plant scheduling for a manufacturer, reducing costs and increasing throughput, by predicting the optimal sequence of work orders, eliminating human error, reducing idle time of assembly lines and streamlining delivery. In the enterprise context, there is sometimes the need to respond to disruption that emanates after a crisis. Our clients today need to chart a meaningful way forward in the new normal post COVID-19. We are working to build machine learning algorithms and automation as potential solutions to the recent disruptions in their workflows and other processes that rely primarily on human interventions. Our research in areas like Explainable AI, Transfer Learning, Generative AI and Capsule Networks are great resources that enrich this journey. Balakrishna D.R. SVP – Head, AI & Automation Services ","tags":""},
	{"title":"Chairman's Statement | Annual Report 2020","url":"chairmans-statement.html","text":"Thinking Resilience. Thinking Scale. The task is to build systems that can quickly scale and evolve to serve the changing needs of the enterprise and its workforce. That is the thinking that guides us as we navigate our clients to respond intuitively to opportunities, and help build value chains that are both efficient and robust to deal with unexpected challenges. That is the resilience our clients seek. That is Live Enterprise. We’ve often heard it said that disruption creeps up on us gradually, then suddenly. But disruption can also play out suddenly, then gradually. Many companies, even in the face of operational challenges through the sudden recent crisis, stepped up with relative ease to manage continuity of business. How Infosys, led by our CEO, Salil Parekh, our COO, U.B. Pravin Rao, and the global senior leadership, enabled 93% of its 2,40,000+ employees, across 46 countries, to work from home offers a fine illustration of this. Our remote access infrastructure was expanded 10x for virtual private network bandwidth and backend capacity scaled by 4x to support the increase in concurrent connected remote users. As many as 35,000 assets were moved to employee residences, and several more personal devices were enabled with wireless connectivity to securely connect with enterprise networks. Cloud-based remote audio, video and content collaboration platforms are integral to this landscape. With over 85% of our workforce already enabled for distributed agile working and with over 10,000 scrum masters in the Company, remote development work proved less of a challenge for us. The InfyMe app continues to connect all Infosys employees to the latest updates from advisories, to company policies and other benefits on offer, while allowing them to self-declare their health status. Meanwhile, over 9,000 trainees and interns relocated to their homes from our residential Global Education Center in Mysuru, India. They are all enabled to continue training on our digital learning platform, Lex. In addition to bite-sized content from the Foundation Program, Lex brings trainer-led lessons, a hands-on lab environment and even proctored internal certifications – all virtually – to the homes of learners. Much of this has been made possible by our digital transformation in the past two years – enabled by our virtual workspaces, secure polycloud environment, micro-survey services for our digital platforms, services curated in our service store and tools for remote collaboration. But the real test will come in the following months when we must find ways to understand and respond to the gradually evolving dynamics of the new normal. Technology will prove an ally here. That said, building systems and operating models at enterprisescale is an exercise in factoring scale intrinsically into the design of solutions. For example, our systems were severely tested in their ability to scale when for a multinational telecommunications company, we leveraged Launchpad, our remote employee onboarding platform, to include their employees, spread across three countries, into a new project environment with access to over 200 IT applications, network operations and six large data centers connecting ~16,000 servers. For another American multinational in the food business, we are now leveraging our Live Enterprise Application Platform to enable remote knowledge transfer for their global project teams while digitizing all their standard operating procedures. The task then is to build systems that can quickly scale and evolve to serve the changing needs of the enterprise and its workforce. That is the thinking that guides us as we navigate our clients to respond intuitively to opportunities, and help build value chains that are both efficient and robust to deal with unexpected challenges. That is the resilience our clients seek. That is Live Enterprise. The task is to build systems that can quickly scale and evolve to serve the changing needs of the enterprise and its workforce. That is the thinking that guides us as we navigate our clients to respond intuitively to opportunities, and help build value chains that are both efficient and robust to deal with unexpected challenges. That is the resilience our clients seek. That is Live Enterprise. The post-cloud era – characterized by increasingly intelligent, autonomous and self-healing digital infrastructure – is bringing our industry the opportunity to do so much more. Our strong balance sheet, great growth momentum, scaled digital systems for our people to deliver collaboratively and an executive management team relentlessly focused on executing our digital strategy, uniquely position Infosys to deal with the unprecedented challenges of these times and help our clients navigate to the next normal. Nandan M. Nilekani Chairman","tags":""},
	{"title":"Key Trends | Annual Report 2020","url":"keytrends.html","text":"Key Trends Key Trends demonstrate continued Business Success Key Trends at a Glance The financial year ending March 31, 2020 was an exceptional year for Infosys. The trust of our clients and the dedication of our employees helped us achieve extraordinary results. Our revenues grew by 9.8% in constant currency. Our digital work grew by 38%. And it comprises 42% of our overall revenue in Q4. Our large transformation deals were at US$ 9 billion. Our earnings per share grew by 8.3% in US dollar terms. We had operating cash flow of US$ 2.6 billion, which grew at 15.4% for the year. And we ended the year with US$ 3.6 billion in cash on our balance sheet. The Company announced dividend payout of US$ 1.1 billion for the year. At the end of the year we had over 2,42,000 employees. Revenues (1) Based on IFRS consolidated financial statements Profit (1) Based on IFRS consolidated financial statements (2) During the year ended March 31, 2019 and 2018, on account of the conclusion of advance pricing arrangements in overseas jurisdictions, the Company had reversed income tax expense provision of ` 94 crore (US$ 14 million) and ` 1,432 crore (US$ 225 million) respectively, which pertained to previous periods. (3) During the year ended March 31, 2018, the Company’s wholly-owned subsidiaries, Kallidus and Skava (together referred to as “Skava”) and Panaya, were classified as “Held for Sale”, resulting in a reduction of fair value in respect of Panaya amounting to ` 118 crore (US$ 18 million). During the year ended March 31, 2019, a further reduction of ` 270 crore (US$ 39 million) was recorded in respect of Panaya. On reclassification of Panaya and Skava from “Held for Sale” during the year ended March 31, 2019, the Company recognized an adjustment in respect of excess of carrying amount over recoverable amount of ` 451 crore (US$ 65 million) in respect of Skava. (4) Attributable to owners of the Company","tags":""},
	{"title":"Downloads | Annual Report 2020","url":"downloads.html","text":"Downloads Board's Report Annexures to the Board’s report Management’s discussion and analysis Corporate governance report CEO and CFO certification Standalone financial statements Consolidated financial statements Business responsibility report","tags":""},

]};
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
	var windowY = $(window).height()
	$(window).scroll(function counter() {
		if ($('#figures > div:nth-of-type(2)').offset().top - (windowY*3/4) < $(window).scrollTop()) {
			$('#figures h1').each(function(i) {countUpNum(this, i)})
			$(window).unbind('scroll', counter);
		}
	})
}

function showClickableLinks() {
	$('.navbar .nav-link ').each(function(nl) {
		if($(this).attr('href') !== '#' && !$(this).attr('data-toggle') && !$(this).hasClass('active')) {
			var that = this;
			// console.log($(this).parent().parent());
			if($(this).parent().parent().hasClass('collapse') && !$(this).parent().parent().hasClass('show')) {
				that = $(this).parent().parent().prev();
			}
			$(that).css('animation-name', 'highlight');
			$(that).one('animationend', function() {
				$(that).css('animation-name', '');
			});
		}
	})
}

$(document).ready(function(){
	// animations
	AOS.init({duration: 1000, mirror: true});

	// navbar open/close
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
	$('.nav-link[href="#"]').click(showClickableLinks);

	// hide navbar on scroll down
	if ($('.hide-on-scroll').length > 0) {
		var scrollY = 0;
		$(window).bind('scroll', function() {
			if ($('body.search-open').length > 0) return;
			var currentY = $(window).scrollTop();
			$('.hide-on-scroll').toggleClass('scrolling-up', currentY < scrollY)
			scrollY = currentY;
		});
	}
	// article controller
	$('.article-control').click(function(){
		var articleID = $(this).data('article-id');
		$('div[data-article-body]').fadeOut(500, function () {
			$(`div[data-article-body=${articleID}]`).fadeIn(500);
			AOS.refresh();
		});
		$('.article-control').removeClass('active');
		$(this).addClass('active');
	})
	if ($('#figures').length > 0) setUpCountUp();
});