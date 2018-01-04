$(document).ready(function() {
	$(".js-ie-hover-fix").hover(function() {
		$(this).addClass('hover')
	}, function() {
		$(this).removeClass('hover')
	})
});