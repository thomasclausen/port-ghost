/**
 * Main JS file for Port
 **/

(function () {
	'use strict';

	var documentState = null,
		body = document.body,
		iframes = document.getElementsByTagName('iframe'),
		iframesLength = iframes.length,
		textOptions = document.querySelector('.text-options'),
		lastType = null;

	function poorMansDebugging(string) {
		if (window.console) {
			console.log(string);
		}
	};

	function init() {
		// Do something
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

		textOptions.style.top = boundary.top - 5 + window.pageYOffset + 'px';
		textOptions.style.left = (boundary.left + boundary.right) / 2 + 'px';
	};
	function checkTextHighlighting(event) {
		var selection = window.getSelection();

		if (selection.isCollapsed === true) {
			classie.removeClass(textOptions, 'js-show');
		} else {
			var currentNodeList = findNodes(selection.focusNode);

			if (hasNode(currentNodeList, 'ARTICLE')) {
				updateBubblePosition();
				classie.addClass(textOptions, 'js-show');
			}
		}

		lastType = selection.isCollapsed;
	};
	document.addEventListener('mouseup', function () {
		setTimeout(checkTextHighlighting, 1);
	});
	document.addEventListener('onresize', updateBubblePosition);
})();
