$(function() {

	// TODO: Commands and stuff
	function cmdeval(cmdstr) {
		if( cmdstr == 'man mkaito') {
			return meta['manpages']['mkaito'];
		} else {
			return cmdstr;
		}
	}

	function clearOutput() {
		$("#output").empty();
	}

	function printOutput(output) {
		var lines = output.split('\n');
		var queue, delay, characters;
		delay = 0;
		queue = []

		for (var l = 0; l < lines.length; l++) {
			characters = lines[l].split('');

			if(characters[0] != '<') {
				characters.unshift('<p>');
				characters.push('</p>');
			}

			queue = queue.concat(characters);
		}

		for (var i = 0; i < queue.length; i++) {
			delay += Math.floor(Math.random()*16);

			setTimeout(function(char) {
				$('#output').append(char);
			}, delay, queue[i]);
		}
	}

	// Scripted init
	printOutput("<h1>Welcome to Robocorp Industries</h1>\nAttempting authentication using token found in ~/.ssh/id_rsa...");

	setTimeout(function() {
		printOutput("Authentication successful!\nPlease stand by while I scan your vitals...");
	}, 2000);

	setTimeout(function() {
		printOutput("Your biological fap signature has not been recognized.\nAccess granted to public data containers.\nType 'help' if you feel lost.");
	}, 3500);

	// Set up
	$(window).click(function(e) {
		$('#console input[type=text]').focus();
	});

	$('#console input[type=text]').autoGrowInput({
		comfortZone: 0,
		minWidth: 0
	});

	$('#console input[type=text]').keypress(function(e) {
		console.log('Key event received: ' + e.which);

		$('html, body').animate({ 
			scrollTop: $(document).height()-$(window).height()}, 
			1400, 
			"linear"
			);

		if( e.which == 13 ) {
			// Received Enter
			printOutput(cmdeval($(this).val()));
			$(this).val('');
		} else if ( e.which == 108 && e.ctrlKey) {
			// Ctrl+L, clear output pane.
			clearOutput();
			e.preventDefault();
			e.stopPropagation();
		}
	});
});
