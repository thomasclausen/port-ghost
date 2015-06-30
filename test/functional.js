var page = require('webpage').create(),
	system = require('system'),
	t = Date.now();

page.open('http://localhost:2368/', function (status) {
	if (status !== 'success') {
		console.error('FAILED to load the address');
	} else {
		t = Date.now() - t;

		var title = page.evaluate(function () {
			return document.title;
		});

		console.log('Loading: http://localhost:2368/');
		console.log('Page title is: ' + title);
		console.log('Loading time: ' + t + ' msec');
	}
	phantom.exit();
});
