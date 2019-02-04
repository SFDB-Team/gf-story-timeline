//
var image_scale = .56,
	index =(localStorage.getItem('index')) ? parseInt(localStorage.getItem('index')) : 0,
	lastIndex = index,
	lang, info, catalog, header, data, offtoggle=false;
//
initLang();
setupViews();
setTimelineDrag();
setHover();
// DEBUG
// enterStory();
//
$(document).ready(()=>{
	$(window).resize(updateViews)
})
function updateViews(){
	setupViews();
	updateTimelineViews()
}
//
function initLang(){
	lang =(localStorage.getItem('lang')) ? localStorage.getItem('lang') : 'KR';
	localStorage.setItem('lang', lang);
	fetch(`data/${lang}/info.json`).then(response=>response.json().then(jsonData=>{
		info = jsonData;
		bindEnterAboutData();
		loadJSONHeader()
	}))
};
function loadJSONHeader(){
	fetch(`data/${lang}/header.json`).then(response=>response.json().then(jsonData=>{
		header = jsonData;
		loadJSONData()
	}))
};
function loadJSONData(){
	fetch(`data/${lang}/data.json`).then(response=>response.json().then(jsonData=>{
		data = jsonData;
		loadJSONCatalog()
	}))
};
function loadJSONCatalog(){
	fetch(`data/${lang}/catalog.json`).then(response=>response.json().then(jsonData=>{
		catalog = jsonData;
		initData()
	}))
};
function switchLang(selectedLang){
	if(selectedLang == 'ZH_CN'||selectedLang == 'KR'){
		lang = selectedLang;
		localStorage.setItem('lang', lang);
		fetch(`data/${lang}/data.json`).then(response=>response.json().then(jsonData=>{
			data=jsonData.data
		}));
		window.location.reload()
	}else{
		alert('Coming Sooooooon ...');
		return
	}
};
function enterStory(){
	var enterF=document.getElementById('enter_frame'),mF=document.getElementById("main_frame"),efH=enterF.clientHeight;
	enterF.style.transition="height 0.5s";
	enterF.style.height=`300%`;
	enterF.addEventListener("transitionend",()=>enterF.style.display="none");
	mF.classList.add("show");
	setHotkey()
};
function bindEnterAboutData(){
	document.title=info.enter.title;
	document.getElementById("about_title").innerHTML=info.about.title;
	document.getElementById("about_tip").innerHTML=info.about.tip;
	document.getElementById("about_github").innerHTML=info.about.github;
	document.getElementById("about_producer").innerHTML=info.about.producer;
	document.getElementById("about_developer").innerHTML=info.about.developer;
	document.getElementById("about_dev_helper").innerHTML=info.about.dev_helper;
	document.getElementById("about_zh_cn").innerHTML=info.about.zh_cn;
	document.getElementById("about_zh_tw").innerHTML=info.about.zh_tw;
	document.getElementById("about_kr").innerHTML=info.about.kr;
	document.getElementById("about_en").innerHTML=info.about.en;
	document.getElementById("about_jp").innerHTML=info.about.jp;
	document.getElementById("about_close").innerHTML=info.about.close;
	document.getElementById("enter_title").innerHTML=info.enter.title;
	document.getElementById("enter_caution").innerHTML=info.enter.caution;
	document.getElementById("enter_info").innerHTML=info.enter.info;
	document.getElementById("enter_about").innerHTML=info.enter.about;
	document.getElementById("enter_enter").innerHTML=info.enter.enter;
	document.getElementById("lang").style.color="#FFF";
	document.querySelector(`#lang_${lang}`).style.color="#FBA400";
	document.getElementById("info_title").innerHTML=info.info.title;
	document.getElementById("info_detail").innerHTML=info.info.detail;
	document.getElementById("info_close").innerHTML=info.info.close
};
function OnOff(e){
	var ID=e.target.id;
	if(ID.includes("catalog_detail")) ID=e.target.parentNode.id;
	about="enter_about about_close".split(" ");
	info="detail_btn_info info_close".split(" ");
	catal="detail_btn_index catalog_close".split(" ");
	arr=[about,info,catal];
	for(var k in arr){
		if(ID=="catalog_detail"){
			elem=document.getElementById("catalog_frame");
			break
		};
		if(arr[k].includes(ID)==1){
			if(k=="0"){
				elem=document.getElementById("about_frame");
				break
			};
			if(k=="1"){
				elem=document.getElementById("info_frame");
				break
			};
			if(k=="2"){
				elem=document.getElementById("catalog_frame");
				break
			}
		}
	}
	elem.style.transition="all 0.5s";
	if(offtoggle){
		elem.style.opacity="0";
		setTimeout(()=>elem.style.display="none",500)
	}else{
		elem.style.display="flex";
		setTimeout(()=>elem.style.opacity="1",50)
	};
	offtoggle=!offtoggle
};
for(var i of document.querySelectorAll("#enter_about,#about_close,#detail_btn_info,#info_close,#detail_btn_index,#catalog_close")){
	i.addEventListener("click",OnOff)
};
//
function initData(){
	var storageIndex = parseInt(localStorage.getItem('index'));
	if(storageIndex && storageIndex < data.length){
		index = storageIndex
	}else{
		index = 0;
		localStorage.setItem('index', index)
	}
	bindDetailData();
	initTimelineViews();
	updateTimelineViews();
	bindTimelineData();
	initCatalogViews();
	bindCatalogData()
};
function setupViews(){
	document.querySelector("body").style.overflow="hidden";
	var screen_W = $(window).width(),
		screen_H = $(window).height(),
		frame = $('#main_frame');
	frame.width(screen_W);
	frame.height(screen_H);
	var detail = $('#detail');
	detail.width(frame.width());
	detail.height(frame.height() * .75);
	var detail_btnleft = $('#detail_btnleft');
	detail_btnleft.height(detail.height());
	var detail_btnright = $('#detail_btnright');
	detail_btnright.height(detail_btnleft.height());
	var detail_frame = $('#detail_frame');
	detail_frame.width(detail.width() - detail_btnleft.width() * 2);
	detail_frame.height(detail.height());
	var detail_frame_image = $('#detail_frame_image');
	var detail_frame_text = $('#detail_frame_text');
	if(screen_W >= screen_H){
		detail_btnleft.width(60);
		detail_btnright.width(detail_btnleft.width());
		detail_frame.css('flex-direction', 'row');
		var detail_frame_image_W = detail_frame.width() * .5;
		var detail_frame_image_H = detail_frame_image_W * image_scale;
		detail_frame_image.width(detail_frame_image_W);
		detail_frame_image.height(detail_frame_image_H);
		detail_frame_image.css('margin-top', '0px');
		detail_frame_text.css('margin-bottom', '0px');
		detail_frame_text.css('margin-left', detail_frame.width() * .03 + 'px');
		detail_frame_text.css('margin-top', '0px');
		detail_frame_text.css('margin-bottom', '0px');
		detail_frame_text.width(detail_frame.width() * .37);
	}else{
		var btnW = detail.width() * .06;
		if(btnW < 30) btnW = 30;
		detail_btnleft.width(btnW);
		detail_btnright.width(btnW);
		detail_frame.css('flex-direction', 'column');
		var detail_frame_image_W = detail_frame.width() * .6;
		if(screen_H <= 650) detail_frame_image_W = detail_frame.width() * .35;
		if(screen_H <= 600) detail_frame_image_W = 0;
		var detail_frame_image_H = detail_frame_image_W * image_scale;
		detail_frame_image.width(detail_frame_image_W);
		detail_frame_image.height(detail_frame_image_H);
		detail_frame_image.css('margin-top', detail_frame.height() * .1 + 'px');
		detail_frame_text.css('margin-bottom', detail_frame.width() * .05 + 'px');
		detail_frame_image.css('display', 'table-cell');
		detail_frame_image.css('vertical-align', 'middle');
		detail_frame_text.css('margin-left', '10px');
		detail_frame_text.css('margin-right', '10px');
		detail_frame_text.css('margin-top', detail_frame.width() * .05 + 'px');
		detail_frame_text.css('margin-bottom', detail_frame.width() * .1 + 'px');
		detail_frame_text.width(detail_frame.width() - detail_frame.width() * .12);
	}
	var detail_btnskip_left = $('#detail_btnskip_left');
	detail_btnskip_left.height(detail.height() * .15);
	detail_btnskip_left.css({'left': 0});
	detail_btnskip_left.width(detail_btnleft.width());
	var detail_btnskip_right = $('#detail_btnskip_right');
	detail_btnskip_right.height(detail_btnskip_left.height());
	detail_btnskip_right.css({'left': detail.width() - detail_btnright.width()});
	detail_btnskip_right.width(detail_btnright.width());
	var detail_btn_index = $('#detail_btn_index');
	detail_btn_index.height(detail.height() * .15);
	detail_btn_index.css({'left': 0});
	detail_btn_index.css({'top': detail_btnleft.height() - detail_btn_index.height()});
	detail_btn_index.width(detail_btnleft.width());
	var detail_btn_info = $('#detail_btn_info');
	detail_btn_info.height(detail_btn_index.height());
	detail_btn_info.css({'left': detail.width() - detail_btnright.width()});
	detail_btn_info.css({'top': detail_btn_index.css('top')});
	detail_btn_info.width(detail_btnright.width());
	var timeline = $('#timeline');
	timeline.css('margin-top', '10px');
	timeline.width(frame.width());
	timeline.height(frame.height() * .25 - 10);
	var timeline_header = $('#timeline_header');
	timeline_header.width(timeline.width());
	timeline_header.height(timeline.height() * .15);
	var timeline_track = $('#timeline_track');
	timeline_track.width(timeline.width());
	timeline_track.height(timeline.height() - timeline.height() * .15);
	// var timeline_footer = $('#timeline_footer');
	// timeline_footer.width(timeline.width());
	// timeline_footer.height(timeline.height() * 0);
	// timeline_footer.css('top', timeline.height() + 'px')
};
function bindDetailData(){
	var detail_frame_image = $("#detail_frame_image");
	if(detail_frame_image.css('display') != 'none'){
		detail_frame_image.animate({opacity: 'toggle'}, 'fast', null, function(){
			detail_frame_image.attr('src', 'image/' + lang + '/'+ data[index].image);
			detail_frame_image.animate({opacity: 'toggle'}, 'fast');
		});
	}
	var detail_frame_text_title = $('#detail_frame_text_title');
	detail_frame_text_title.animate({opacity: 'toggle'}, 'fast', null, function(){
		detail_frame_text_title.html(data[index].title);
		detail_frame_text_title.animate({opacity: 'toggle'}, 'fast');
	});
	var detail_frame_text_subtitle = $('#detail_frame_text_subtitle');
	detail_frame_text_subtitle.animate({opacity: 'toggle'}, 'fast', null, function(){
		detail_frame_text_subtitle.html(data[index].subtitle);
		detail_frame_text_subtitle.animate({opacity: 'toggle'}, 'fast');
	});
	var detail_frame_text_content = $('#detail_frame_text_content');
	detail_frame_text_content.animate({opacity: 'toggle'}, 'fast', null, function(){
		detail_frame_text_content.html(data[index].content);
		detail_frame_text_content.animate({opacity: 'toggle'}, 'fast');
	})
};
function initCatalogViews(){
	for(item in catalog.index){
		var catalog_detail_item_div = $('<div></div>');
		catalog_detail_item_div.attr('id', 'catalog_detail_item_div_' + item);
		catalog_detail_item_div.addClass('catalog_detail_item_div');
		catalog_detail_item_div.appendTo($('#catalog_detail'));
	}
};
function bindCatalogData(){
	document.getElementById("catalog_title").innerHTML=catalog.title;
	document.getElementById("catalog_close").innerHTML=catalog.close;
	for(item in catalog.index){
		var catalog_detail_item_div=document.getElementById(`catalog_detail_item_div_${item}`);
		catalog_detail_item_div.addEventListener("click",item=>{
			OnOff(item);
			clickCatalogItem(item)
		});
		catalog_detail_item_div.innerHTML=catalog.index[item].title;
	}
};
function initTimelineViews(){
	for(item in header){
		var timeline_header_item_span = $('<span></span>');
		timeline_header_item_span.attr('id', 'timeline_header_item_span_' + item);
		if(item % 2 == 0) timeline_header_item_span.addClass('timeline_header_item_span_even');
		else timeline_header_item_span.addClass('timeline_header_item_span_odd');
		var timeline_header_track = $('#timeline_header_track');
		timeline_header_item_span.appendTo(timeline_header_track);
	}
	for(item in data){
		var timeline_track_item_div = $('<div></div>');
		timeline_track_item_div.attr('id', 'timeline_track_item_div_' + item);
		timeline_track_item_div.addClass('timeline_track_item_div');
		var timeline_track_item_subdiv_img = $('<div></div>');
		timeline_track_item_subdiv_img.attr('id', 'timeline_track_item_subdiv_img_' + item);
		timeline_track_item_subdiv_img.css('margin', '5px');
		var timeline_track_item_img = $('<img></img>');
		timeline_track_item_img.attr('id', 'timeline_track_item_img_' + item);
		timeline_track_item_img.addClass('timeline_track_item_img');
		timeline_track_item_img.appendTo(timeline_track_item_subdiv_img);
		var timeline_track_item_subdiv_span = $('<div></div>');
		timeline_track_item_subdiv_span.attr('id', 'timeline_track_item_subdiv_span_' + item);
		timeline_track_item_subdiv_span.css('margin', '5px 10px 10px 5px');
		timeline_track_item_subdiv_span.css('overflow', 'hidden');
		var timeline_track_item_span = $('<span></span>');
		timeline_track_item_span.attr('id', 'timeline_track_item_span_' + item);
		timeline_track_item_span.addClass('timeline_track_item_span');
		timeline_track_item_span.appendTo(timeline_track_item_subdiv_span);
		timeline_track_item_subdiv_img.appendTo(timeline_track_item_div);
		timeline_track_item_subdiv_span.appendTo(timeline_track_item_div);
		var timeline_track = $('#timeline_track');
		timeline_track_item_div.appendTo(timeline_track);
	}
};
function updateTimelineViews(){
	var timeline_track = $('#timeline_track')
	var timeline_track_height = timeline_track.height();
	var timeline_track_div_height =(timeline_track_height - 20) / 3;
	timeline_track.css('top', $('#timeline_header').position().top + $('#timeline_header').height() + 'px');
	timeline_track.css('left', $('#timeline').width() / 2 + 'px');
	for(item in header){
		var timeline_header = $('#timeline_header');
		var timeline_header_item_span = $('#timeline_header_item_span_' + item);
		timeline_header_item_span.css('position', 'absolute');
		if(item % 2 == 0) timeline_header_item_span.css('left', header[item].position_x - 5 + 'px');
		else timeline_header_item_span.css('left', header[item].position_x + 'px');
		timeline_header_item_span.css('line-height', timeline_header.height() + 'px');
		timeline_header_item_span.height(timeline_header.height());
		timeline_header_item_span.width(65535);
	}
	var timeline_divider = $('#timeline_divider');
	timeline_divider.css('left', '0px');
	timeline_divider.css('top', timeline_header.position().top - 10 + 'px');
	timeline_divider.css('width', $('#timeline').width() + 'px');
	var timeline_pointer = $('#timeline_pointer');
	timeline_pointer.css('left', $('#timeline').width() / 3 - 3.5 + 'px');
	timeline_pointer.css('top', timeline_header.position().top);
	timeline_pointer.css('height', $('#timeline').height() + 'px');
	for(item in data){
		var timeline_track_item_subdiv_img = $('#timeline_track_item_subdiv_img_' + item);
		var timeline_track_item_subdiv_span = $('#timeline_track_item_subdiv_span_' + item);
		var timeline_track_item_img = $('#timeline_track_item_img_' + item);
		var timeline_track_item_span = $('#timeline_track_item_span_' + item);
		var position_x = data[item].position_x;
		var position_y = data[item].position_y;
		var position_width = data[item].position_width;
		var item_left_zero = 0;
		var item_top_zero = 0;
		var timeline_track_item_div = $('#timeline_track_item_div_' + item);
		timeline_track_item_div.css('left', position_x + 'px');
		timeline_track_item_div.css('top', item_top_zero + 5 + position_y *(timeline_track_div_height + 5) + 'px');
		timeline_track_item_div.width(position_width - 5);
		timeline_track_item_div.height(timeline_track_div_height);
		timeline_track_item_subdiv_img.width(1 / image_scale *(timeline_track_div_height - 10));
		timeline_track_item_subdiv_img.height(timeline_track_div_height - 10);
		timeline_track_item_subdiv_span.width(timeline_track_item_div.width() - timeline_track_item_subdiv_img.width() - 20);
		timeline_track_item_img.width(timeline_track_item_subdiv_img.width());
		timeline_track_item_img.height(timeline_track_item_subdiv_img.height())
		timeline_track_item_span.width(timeline_track_item_subdiv_span.width());
		timeline_track.width(data[item].position_x + data[item].position_width + 10);
	}
	// $('#timeline_footer').css('top', timeline_track.position().top + timeline_track.height() + 'px');
	if(data) moveTimelineToIndexWithDuration(0)
};
function bindTimelineData(){
	for(item in header){
		var timeline_header_item_span = document.getElementById(`timeline_header_item_span_${item}`);
		timeline_header_item_span.innerHTML=header[item].title;
	}
	for(item in data){
		var timeline_track_item_div = document.getElementById(`timeline_track_item_div_${item}`);
		timeline_track_item_div.addEventListener("click",item=>{clickTimelineItem(item)});
		var timeline_track_item_img=document.getElementById(`timeline_track_item_img_${item}`),
			timeline_track_item_span=document.getElementById(`timeline_track_item_span_${item}`),
			data_image = `image/${lang}/${data[item].image}`,
			data_title = data[item].title;
		timeline_track_item_img.setAttribute("src",data_image);
		timeline_track_item_span.innerHTML=data_title;
	}
};
function clickDetailBtn(operation){
	index += operation;
	if(index < 0){
		index = 0;
	}
	if(index >= data.length){
		index = data.length - 1;
	}
	localStorage.setItem('index', index);
	// console.log('index = ' + index);
	bindDetailData();
	moveTimelineToIndexWithDuration(300)
};
function clickTimelineItem(e){
	index = e.target.id.replace("timeline_track_item_div_","");
	if(index.length>2) index=e.target.id.replace("timeline_track_item_span_","");
	if(index.length>2) index=e.target.id.replace("timeline_track_item_subdiv_span_","");
	if(index.length>2) index=e.target.id.replace("timeline_track_item_img_","");
	// console.log('index = ' + index);
	localStorage.setItem('index', index);
	bindDetailData();
	moveTimelineToIndexWithDuration(300)
};
function clickCatalogItem(e){
	catalogIndex = e.target.id.replace("catalog_detail_item_div_","");
	index = catalog.index[catalogIndex].index;
	// console.log('index = ' + index);
	localStorage.setItem('index', index);
	bindDetailData();
	moveTimelineToIndexWithDuration(0)
};
function moveTimelineToIndexWithDuration(duration){
	var timeline = $('#timeline');
	var timeline_track = $('#timeline_track');
	var timeline_header_track = $('#timeline_header_track');
	var _x = - data[index].position_x + timeline.width() / 3;
	var limit = - Math.abs(timeline.width() / 3 - timeline_track.width()) + 5;
	if(_x < limit) _x = limit;
	timeline_header_track.animate({left: _x + 'px'}, duration);
	timeline_track.animate({left: _x + 'px'}, duration);
	setTimelineItemColor()
};
function setTimelineItemColor(){
	var lastItem = $('#timeline_track_item_subdiv_span_' + lastIndex).children('.timeline_track_item_span');
	var item = $('#timeline_track_item_subdiv_span_' + index).children('.timeline_track_item_span');
	lastItem.css('color', '#FFF');
	item.css('color', '#FBA400');
	lastIndex = index
};
function setTimelineDrag(){
	var timeline_track = $('#timeline_track');
	var timeline_header_track = $('#timeline_header_track');
	var isTouch = window.hasOwnProperty('ontouchstart');
	var dragEvent = isTouch ?{
		down: 'touchstart',
		move: 'touchmove',
		up: 'touchend',
		over: 'touchstart',
		out: 'touchend'
	} :{
		down: 'mousedown',
		move: 'mousemove',
		up: 'mouseup',
		over: 'mouseover',
		out: 'mouseout'
	}
	timeline_track.on(dragEvent.down, function(e){
		$(this).css('cursor', 'move');
		var offset = timeline_track.offset(),
			x = isTouch ?(e.touches[0].pageX - offset.left) :(e.pageX - offset.left);
		$(document).on(dragEvent.move, function(ev){
			// timeline_track.stop();
			var _x = isTouch ?(ev.touches[0].pageX - x) :(ev.pageX - x);
			if(_x > $('#timeline').width() / 3) _x = $('#timeline').width() / 3;
			var limit = - Math.abs($('#timeline').width() / 3 - timeline_track.width()) + 5;
			if(_x < limit) _x = limit;
			timeline_track.animate({left: _x + 'px'}, 10);
			timeline_header_track.animate({left: _x + 'px'}, 10);
		});
	});
	$(document).on(dragEvent.up, function(){
		timeline_track.css('cursor', 'default');
		$(this).off(dragEvent.move);
	})
};
var btnFlag = false,
	prevBtn = 0;
function setHotkey(){
	$(document).keydown(function(event){
		if(!btnFlag){
			btnFlag = true;
			prevBtn = event.which;
			setTimeout(function(){
				btnFlag = false;
			}, 250);
			switch(event.keyCode){
					case 37:
						clickDetailBtn(-1);
						break;
					case 38:
						// clickDetailBtn(-index);
						clickDetailBtn(-20);
						break;
					case 39:
						clickDetailBtn(1);
						break;
					case 40:
						// clickDetailBtn(data.length - 1);
						clickDetailBtn(20);
						break;
			}
		}
		else if(prevBtn != event.which){
			btnFlag = false;
		}
		return false;
	})
};
function setHover(){
	var isTouch = window.hasOwnProperty('ontouchstart'),
	dragEvent = isTouch ?{
		down: 'touchstart',
		move: 'touchmove',
		up: 'touchend',
		over: 'touchstart',
		out: 'touchend'
	} :{
		down: 'mousedown',
		move: 'mousemove',
		up: 'mouseup',
		over: 'mouseover',
		out: 'mouseout'
	}
	$('#detail_btnskip_left').on(dragEvent.over, function(ev){
		$(this).addClass('btn_hover');
	});
	$('#detail_btnskip_left').on(dragEvent.out, function(ev){
		$(this).removeClass('btn_hover');
	});
	$('#detail_btnskip_right').on(dragEvent.over, function(ev){
		$(this).addClass('btn_hover');
	});
	$('#detail_btnskip_right').on(dragEvent.out, function(ev){
		$(this).removeClass('btn_hover');
	});
	$('#detail_btn_index').on(dragEvent.over, function(ev){
		$(this).addClass('btn_hover');
	});
	$('#detail_btn_index').on(dragEvent.out, function(ev){
		$(this).removeClass('btn_hover');
	});
	$('#detail_btn_info').on(dragEvent.over, function(ev){
		$(this).addClass('btn_hover');
	});
	$('#detail_btn_info').on(dragEvent.out, function(ev){
		$(this).removeClass('btn_hover');
	});
	$('#detail_btnleft').on(dragEvent.over, function(ev){
		$(this).addClass('btn_hover');
	});
	$('#detail_btnleft').on(dragEvent.out, function(ev){
		$(this).removeClass('btn_hover');
	});
	$('#detail_btnright').on(dragEvent.over, function(ev){
		$(this).addClass('btn_hover');
	});
	$('#detail_btnright').on(dragEvent.out, function(ev){
		$(this).removeClass('btn_hover');
	})
}
