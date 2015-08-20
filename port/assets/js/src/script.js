/**
 * Main JS file for Port
 **/

(function () {
	'use strict';

	var documentState = null,
		body = document.body,
		iframes = document.getElementsByTagName('iframe'),
		iframesLength = iframes.length;

	function poorMansDebugging(string) {
		if (window.console) {
			console.log(string);
		}
	};

	function init() {
		if (classie.hasClass(body, 'post-template')) {
			var wordsPerMinute = 200,
				postContent = document.querySelector('.post-content').textContent,
				totalWords = postContent.trim().split(/\s+/g).length;

			document.querySelector('.post-meta .reading-time').innerHTML = Math.ceil(totalWords / wordsPerMinute);
		}
	};

	documentState = setInterval(function () {
		poorMansDebugging('documentState: ' + document.readyState);
		if (document.readyState === 'complete') {
			clearInterval(documentState);
			init();
		}
	}, 100);

	if (iframesLength !== 0) {
		for (var i = 0; i < iframesLength; i++) {
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
