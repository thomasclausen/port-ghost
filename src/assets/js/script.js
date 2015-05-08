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

	function socialCount() {
		var elements = document.querySelectorAll('.total-share-count');

		for (var i = 0; i < elements.length; i++) {
			// GET SHARES FROM FACEBOOK
			var requestFacebook = new XMLHttpRequest();
			requestFacebook.open('GET', 'https://graph.facebook.com/?id=' + encodeURIComponent(elements[i].getAttribute('data-share-counts')), true);
			requestFacebook.onreadystatechange = function () {
				if (this.status === 200 && this.readyState === 4) {
					var data = JSON.parse(this.responseText);
					if (data.shares !== undefined) {
						document.querySelector('.total-share-count[data-share-counts="' + data.id + '"] .total-count').innerHTML = data.shares;
					}
				}
				if (this.status >= 400) {
					poorMansDebugging('We reached the server, but it returned an error');
				}
			};

			requestFacebook.onerror = function () {
				poorMansDebugging('There was a connection error of some sort');
			};

			requestFacebook.send();
		}
	}

	function init() {
		// Do something
		if (classie.hasClass(body, 'post-template')) {
			socialCount();
		}
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
