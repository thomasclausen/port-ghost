/**
 * Main JS file for Port
 **/

(function () {
	'use strict';

	var documentState = null,
		body = document.body,
		iframeSelectors = [
			'iframe[src*="player.vimeo.com"]',
			'iframe[src*="youtube.com"]',
			'iframe[src*="youtube-nocookie.com"]',
			'iframe[src*="kickstarter.com"][src*="video.html"]'
		],
		iframes = document.querySelectorAll(iframeSelectors.join(','));

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

	if (iframes.length !== 0) {
		for (var i = 0; i < iframes.length; i++) {
			var iframe = iframes[i],
				ratio = 56.25;

			if (iframe.getAttribute('width') !== null && iframe.getAttribute('height') !== null) {
				if (iframe.getAttribute('width') > iframe.getAttribute('height')) {
					ratio = (iframe.getAttribute('height') / iframe.getAttribute('width')) * 100;
				} else {
					ratio = (iframe.getAttribute('width') / iframe.getAttribute('height')) * 100;
				}
			}

			iframe.outerHTML = '<div class="embed-responsive" style="padding-bottom:' + ratio + '%">' + iframe.outerHTML + '</div>';
		}
	}
})();
