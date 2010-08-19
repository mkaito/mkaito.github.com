// mkaito blog scripting stuff
// Uses Mootools 1.2.4

////
// Selects a random element from a predefined array of possible backgrounds
// and constructs a css property with the result.
//
var getRandomHeaderBG = function() {
    var backgrounds = ['bg_steampunk_01.jpg',
		       'bg_steampunk_02.jpg',
		       'bg_steampunk_03.jpg'];
	
    return "url('/images/site/headers/" + backgrounds.getRandom() + "')";
};

var insertTOC = function() {
    var articleHeader = $$("article > header")[0];
    var toc = new Element('div', {id: 'toc'});
    var tocList = new Element('ul').inject(toc);
    
    var toBeTOCed = $$("article > h2, article > h3, article > h4");
    if (toBeTOCed.length < 2) return false;
    
    toBeTOCed.each(function(e) {
	var li = new Element('li');
	var a = new Element('a', {html: e.innerHTML,
				  href: "#" + e.id});
	
	a.inject(li);
	li.inject(tocList);
    });
    
    toc.inject(articleHeader, "after");
};

////
// main()
//
window.addEvent('domready', function() {
    // Set a random header image
    var randomHeader = getRandomHeaderBG();
    $("container").getElement("header").setStyle("background-image", randomHeader);
    // console.debug("Random Header Image: %s", randomHeader);

    // Generating a toc for articles
    insertTOC();
});

