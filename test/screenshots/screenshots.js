var page = require('webpage').create(),
	system = require('system');

if (system.args[1] === 'mobile') {
	page.viewportSize = {
		width: 320,
		height: 480
	};
}
if (system.args[1] === 'tablet-vertical') {
	page.viewportSize = {
		width: 768,
		height: 1024
	};
}
if (system.args[1] === 'tablet-horizontal') {
	page.viewportSize = {
		width: 1024,
		height: 768
	};
}
if (system.args[1] === 'desktop') {
	page.viewportSize = {
		width: 1280,
		height: 1024
	};
}
page.open('http://localhost:2368/', function (status) {
	if (status !== 'success') {
		console.log('Unable to access the page!');
	} else {
		page.evaluate(function () {
			// Change something in the DOM
		});
		if (system.args[1] !== undefined) {
			page.render('test/port-' + system.args[1] + '.png');
		} else {
			page.render('test/port.png');
		}
	}
	phantom.exit();
});
