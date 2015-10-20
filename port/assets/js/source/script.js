/**
 * Main JS file for Port
 **/

(function () {
	'use strict';

	var documentState = null,
		body = document.body,
		iframes = document.getElementsByTagName('iframe'),
		shareOptions = document.querySelector('.share-options'),
		lastType = null;

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

	for (var i = 0, iframesLength = iframes.length; i < iframesLength; i++) {
		var iframe = iframes[i],
			ratio = '';

		if (iframe.getAttribute('width') > iframe.getAttribute('height')) {
			ratio = (iframe.getAttribute('height') / iframe.getAttribute('width')) * 100;
		} else {
			ratio = (iframe.getAttribute('width') / iframe.getAttribute('height')) * 100;
		}

		iframe.outerHTML = '<div class="embed-responsive" style="padding-bottom:' + ratio + '%">' + iframe.outerHTML + '</div>';
	}

	function findNodes(element) {
		var nodeNames = {};

		while (element.parentNode) {
			nodeNames[element.nodeName] = true;
			element = element.parentNode;
		}

		return nodeNames;
	}
	function hasNode(nodeList, name) {
		return !!nodeList[name];
	}
	function updateBubblePosition() {
		var selection = window.getSelection(),
			range = selection.getRangeAt(0),
			boundary = range.getBoundingClientRect();

		shareOptions.style.top = boundary.top - 5 + window.pageYOffset + 'px';
		shareOptions.style.left = (boundary.left + boundary.right) / 2 + 'px';
	}
	function checkTextHighlighting() {
		var selection = window.getSelection();

		if (selection.isCollapsed === true) {
			classie.removeClass(shareOptions, 'js-show');
		} else {
			var currentNodeList = findNodes(selection.focusNode);

			if (hasNode(currentNodeList, 'ARTICLE')) {
				updateBubblePosition();
				classie.addClass(shareOptions, 'js-show');
			}
		}

		lastType = selection.isCollapsed;
	}
	document.addEventListener('mouseup', function () {
		setTimeout(checkTextHighlighting, 1);
	});
	document.addEventListener('onresize', updateBubblePosition);

	var shareHighlightedText = function () {
		var selection = window.getSelection();

		if (selection.isCollapsed === false) {
			var shareNetwork = this.getAttribute('data-action'),
				shareUrl = location.href,
				shareUser = 'thomasclausendk',
				shareContent = selection.toString(),
				shareCount = 140 - (6 + shareUrl.length + 6 + shareUser.length);

			if (shareNetwork === 'twitter') {
				if (shareContent.length > shareCount) {
					shareContent = shareContent.substring(0, shareCount) + '...';
				}
				window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(shareUrl) + '&via=' + encodeURIComponent(shareUser) + '&text=' + encodeURIComponent(shareContent) + ' —&original_referer=' + encodeURIComponent(shareUrl), shareNetwork, 'width=550,height=450');
			}
			if (shareNetwork === 'facebook') {
				window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl), shareNetwork, 'width=550,height=450');
			}
			if (shareNetwork === 'google') {
				window.open('https://plus.google.com/share?url=' + encodeURIComponent(shareUrl), shareNetwork, 'width=550,height=450');
			}
		}
	};
	var shareButtons = shareOptions.querySelectorAll('button');
	for (var i = 0; i < shareButtons.length; i++) {
		shareButtons[i].addEventListener('click', shareHighlightedText);
	}
})();
