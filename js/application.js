$(function() {
	$(window).keypress(function(e) {
		var key = e.which;
		console.log("Key event received: " + key);
		return false;
	});
});
