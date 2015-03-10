/**
 * Main JS file for Port
 **/

(function () {
	'use strict';

	var documentState = null,
		body = document.body;

	function poorMansDebugging(string) {
		if (window.console) {
			console.log(string);
		}
	}

	function init() {
		if (classie.hasClass(body, 'post-template')) {
			fetchPrevNextLinks();
		}
	}

	documentState = setInterval(function () {
		poorMansDebugging('documentState: ' + document.readyState);
		if (document.readyState === 'complete') {
			clearInterval(documentState);
			init();
		}
	}, 100);

	function fetchPrevNextLinks() {
		var requestXML = new XMLHttpRequest();
		requestXML.open('GET', '/rss', false);
		requestXML.onreadystatechange = function () {
			if (requestXML.status === 200 && requestXML.readyState === 4 && requestXML.responseXML != null) {
				var rssItems = requestXML.responseXML.getElementsByTagName('item'),
					nextItemNo = 0,
					nextLink = document.querySelector('.post-pagination .next'),
					previousItemNo = 0,
					previousLink = document.querySelector('.post-pagination .prev');

				for(var i = 0; i < rssItems.length; i++) {
					if (rssItems[i].getElementsByTagName('link')[0].textContent === window.location.href) {
						previousItemNo = i + 1;
						nextItemNo = i - 1;
					}
				}

				if (rssItems[nextItemNo] !== undefined) {
					nextLink.innerHTML = '<a href="' + rssItems[nextItemNo].getElementsByTagName('link')[0].textContent.replace(window.location.origin, '') + '" title="' + rssItems[nextItemNo].getElementsByTagName('title')[0].textContent + '" rel="next">&larr; ' + rssItems[nextItemNo].getElementsByTagName('title')[0].textContent + '</a>';
				}
				if (rssItems[previousItemNo] !== undefined) {
					previousLink.innerHTML = '<a href="' + rssItems[previousItemNo].getElementsByTagName('link')[0].textContent.replace(window.location.origin, '') + '" title="' + rssItems[previousItemNo].getElementsByTagName('title')[0].textContent + '" rel="prev">' + rssItems[previousItemNo].getElementsByTagName('title')[0].textContent + ' &rarr;</a>';
				}
			}
			if (requestXML.status >= 400) {
				poorMansDebugging('Couldn\'t retrieve links from RSS Feed.');
			}
		}
		requestXML.onerror = function () {
			poorMansDebugging('Couldn\'t retrieve links from RSS Feed.');
		};
		requestXML.send();
	}
})();
