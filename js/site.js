// mkaito blog scripting stuff
// Uses Mootools 1.2.4

////
// Selects a random element from a predefined array of possible backgrounds
// and constructs a css property with the result.
var getRandomHeaderBG = function() {
    	var backgrounds = ['bg_steampunk_01.jpg',
			   'bg_steampunk_02.jpg',
			   'bg_steampunk_03.jpg'];
	
	var randBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
	var randomHeaderBgPath = "url('/images/site/headers/" + randBg + "')";
	return randomHeaderBgPath;
};

////
// main()
window.addEvent('domready', function() {
    // Set a random header image
    var randomHeader = getRandomHeaderBG();
    $("container").getElement("header").setStyle("background-image", randomHeader);
    console.debug("Random Header Image: %s", randomHeader);
});