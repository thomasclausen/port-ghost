/**
 * Main JS file for Port
 **/

(function () {
	'use strict';

	var documentState = null,
		body = document.body,
		embedSelectors = [
			'iframe[src*="player.vimeo.com"]',
			'iframe[src*="youtube.com"]',
			'iframe[src*="youtube-nocookie.com"]',
			'iframe[src*="kickstarter.com"][src$="video.html"]',
			'iframe[src*="blip.tv"]',
			'iframe[src*="slideshare.net"]',
			'iframe[src*="ted.com"]',
			'iframe[src*="google.com/maps/"]',
			'iframe[src*="dailymotion.com"]',
			'iframe[src*="flickr.com"]',
			'iframe[src*="hulu.com"]',
			'embed[src*="wordpress.com"]',
			'iframe[src*="issuu.com"]'
		],
		embeds = document.querySelectorAll(embedSelectors.join(',')),
		embedsLength = embeds.length;

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

	if (embedsLength !== 0) {
		for (var i = 0; i < embedsLength; i++) {
			var embed = embeds[i],
				embedWidth = embed.getAttribute('width'),
				embedHeight = embed.getAttribute('height'),
				ratio = 56.25;

			if (embedWidth !== null && embedHeight !== null) {
				if (embedWidth > embedHeight) {
					ratio = (embedHeight / embedWidth) * 100;
				} else {
					ratio = (embedWidth / embedHeight) * 100;
				}
			}

			embed.outerHTML = '<div class="embed-responsive" style="padding-bottom:' + ratio + '%">' + embed.outerHTML + '</div>';
		}
	}
})();
