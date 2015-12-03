/**
 * Main JS file for Port
 **/

(function () {
	'use strict';

	var documentState = null,
		body = document.body,
		iframes = document.getElementsByTagName('iframe');

	function poorMansDebugging(string) {
		if (window.console) {
			console.log(string);
		}
	}

	function init() {
		// Do something
	}

	documentState = setInterval(function () {
		poorMansDebugging('documentState: ' + document.readyState);
		if (document.readyState === 'complete') {
			clearInterval(documentState);
			init();
		}
	}, 100);

	for (var i = 0, il = iframes.length; i < il; i++) {
		var iframe = iframes[i],
			ratio = '';

		if (iframe.getAttribute('width') > iframe.getAttribute('height')) {
			ratio = (iframe.getAttribute('height') / iframe.getAttribute('width')) * 100;
		} else {
			ratio = (iframe.getAttribute('width') / iframe.getAttribute('height')) * 100;
		}

		iframe.outerHTML = '<div class="embed-responsive" style="padding-bottom:' + ratio + '%">' + iframe.outerHTML + '</div>';
	}
})();
