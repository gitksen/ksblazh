$(window).load(function() {
	$(".head").addClass("loaded");
});
$(document).ready(function() {
	$(".item").has(".arrow").on("click", function(){
		$(this).toggleClass("active");
	});
	$(".pb_wrap").dotdotdot({
	});
});
