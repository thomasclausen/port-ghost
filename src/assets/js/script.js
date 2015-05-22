/**
 * Main JS file for Port
 **/

(function () {
	'use strict';

	var documentState = null,
		body = document.body,
		videoSelectors = [
			'iframe[src*="player.vimeo.com"]',
			'iframe[src*="youtube.com"]',
			'iframe[src*="youtube-nocookie.com"]',
			'iframe[src*="kickstarter.com"][src*="video.html"]',
			'iframe[src*="blip.tv"]',
			'iframe[src*="slideshare.net"]',
			'iframe[src*="ted.com"]',
			'iframe[src*="google.com/maps/"]',
			'iframe[src*="dailymotion.com"]',
			'iframe[src*="flickr.com"]',
			'iframe[src*="hulu.com"]',
			'embed[src*="wordpress.com"]'
		],
		videos = document.querySelectorAll(videoSelectors.join(','));

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

	if (videos.length !== 0) {
		for (var i = 0; i < videos.length; i++) {
			var video = videos[i],
				ratio = 56.25;

			if (video.getAttribute('width') !== null && video.getAttribute('height') !== null) {
				if (video.getAttribute('width') > video.getAttribute('height')) {
					ratio = (video.getAttribute('height') / video.getAttribute('width')) * 100;
				} else {
					ratio = (video.getAttribute('width') / video.getAttribute('height')) * 100;
				}
			}

			video.outerHTML = '<div class="embed-responsive" style="padding-bottom:' + ratio + '%">' + video.outerHTML + '</div>';
		}
	}
})();
