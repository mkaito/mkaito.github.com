// mkaito's blog scripting stuff
// Uses jquery 1.4.2

var setRandomHeaderBg = function() {
    $("#container > header").css("background-image", function(index, value) {
	var backgrounds = ['bg_steampunk_01.jpg',
			   'bg_steampunk_02.jpg',
			   'bg_steampunk_03.jpg'];
	
	var randBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
	console.log("/images/site/headers/" + randBg);
	return "url('/images/site/headers/" + randBg + "')";});
};

$(document).ready(function(){
    
    // Set a random background image in the header
    setRandomHeaderBg();
});