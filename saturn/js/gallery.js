$(function() {
	$('.gallery-prev').click(function() {
		gallery_prev();
		gallery_resize();
	});

	$('.gallery-next').click(function() {
		gallery_next();
		gallery_resize();
	});
});
function gallery_prev() {
	var items = new Array();
	$(".gallery li").each( function() {
		items.push('<li>'+$(this).html()+'</li>');
	});
	var first_item = items.pop();
	items.reverse().push(first_item);
	items.reverse();
	$(".gallery ul").html(items.join(''));
}
function gallery_next() {
	var items = new Array();
	$(".gallery li").each( function() {
		items.push('<li>'+$(this).html()+'</li>');
	});
	var last_item = items.shift();
	items.push(last_item);
	$(".gallery ul").html(items.join(''));
}
function gallery_resize() {
	var width = $('.wrapme:first').css('width').replace(/([^0-9]+)/,'');
	$(".photos").css('width', width+'px');
	var img_width = $(".gallery li img").css('width').replace(/([^0-9]+)/,'');
	var item_width = Math.floor((width-img_width)/4);
	var last_item_width = width-(item_width*4);
	var i=0;
	$(".gallery li").each( function() {
		i++;
		if (i<5) {
			$(this).css('width', item_width+'px');
		} else {
			$(this).css('width', last_item_width+'px');
		}
	});
}
$( document ).ready(function() {
	gallery_resize();
});
$( window ).load(function() {
	gallery_resize();
});
$( window ).resize(function() {
	gallery_resize();
});
