/**
 * Main JS file for Port
 **/

(function () {
	'use strict';

	var body = document.body,
		iframes = document.getElementsByTagName('iframe');

	var poorMansDebugging = function (string) {
		if (window.console) {
			console.log(string);
		}
	};

	var init = function () {
		// Do something
	};

	var documentState = setInterval(function () {
		poorMansDebugging('documentState: ' + document.readyState);
		if (document.readyState === 'complete') {
			clearInterval(documentState);
			init();
		}
	}, 100);

	if (iframes.length !== 0) {
		for (var i = 0; i < iframes.length; i++) {
			var iframe = iframes[i],
				ratio = '';

			if (iframe.getAttribute('width') > iframe.getAttribute('height')) {
				ratio = (iframe.getAttribute('height') / iframe.getAttribute('width')) * 100;
			} else {
				ratio = (iframe.getAttribute('width') / iframe.getAttribute('height')) * 100;
			}

			iframe.outerHTML = '<div class="embed-responsive" style="padding-bottom:' + ratio + '%">' + iframe.outerHTML + '</div>';
		}
	}
})();
