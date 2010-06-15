// mkaito blog scripting stuff
// Uses jquery 1.4.2

var getRandomHeaderBG = function() {
    	var backgrounds = ['bg_steampunk_01.jpg',
			   'bg_steampunk_02.jpg',
			   'bg_steampunk_03.jpg'];
	
	var randBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
	var randomHeaderBgPath = "url('/images/site/headers/" + randBg + "')";
	return randomHeaderBgPath;
};

$(document).ready(function(){
    
    // Set a random background image in the header
    var randomHeader = getRandomHeaderBG();
    $("#container > header").css("background-image", randomHeader);
    console.debug("setRandomHeaderBG path: %s", randomHeader);

});
