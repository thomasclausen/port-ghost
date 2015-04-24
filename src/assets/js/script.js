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

	var API_KEY = '',
		CLIENT_ID = '',
		SCOPES = 'https://www.googleapis.com/auth/analytics.readonly';

	function handleClientLoad() {
		gapi.client.setApiKey(API_KEY);
		window.setTimeout(checkAuth, 1);
	}

	function checkAuth() {
		gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: true}, handleAuthResult);
	}

	function handleAuthResult(authResult) {
		if (authResult) {
			loadAnalyticsClient();
		} else {
			handleUnauthorized();
		}
	}

	function handleAuthorized() {
		var authorizeButton = document.getElementById('authorize-button'),
			runDemoButton = document.getElementById('run-demo-button');

		authorizeButton.style.visibility = 'hidden';
		runDemoButton.style.visibility = '';
		runDemoButton.onclick = makeApiCall;
		outputToPage('Click the Run Demo button to begin.');
	}

	function handleUnauthorized() {
		var authorizeButton = document.getElementById('authorize-button'),
			runDemoButton = document.getElementById('run-demo-button');

		runDemoButton.style.visibility = 'hidden';
		authorizeButton.style.visibility = '';
		authorizeButton.onclick = handleAuthClick;
		outputToPage('Please authorize this script to access Google Analytics.');
	}

	function handleAuthClick(event) {
		gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: false}, handleAuthResult);
		return false;
	}

	function loadAnalyticsClient() {
		gapi.client.load('analytics', 'v3', handleAuthorized);
	}

	function makeApiCall() {
		outputToPage('Querying Accounts.');
		gapi.client.analytics.management.accounts.list().execute(handleAccounts);
	}

	function handleAccounts(response) {
		if (!response.code) {
			if (response && response.items && response.items.length) {
				var firstAccountId = response.items[0].id;
				queryWebproperties(firstAccountId);
			} else {
				updatePage('No accounts found for this user.');
			}
		} else {
			updatePage('There was an error querying accounts: ' + response.message);
		}
	}

	function queryWebproperties(accountId) {
		updatePage('Querying Webproperties.');
		gapi.client.analytics.management.webproperties.list({'accountId': accountId}).execute(handleWebproperties);
	}

	function handleWebproperties(response) {
		if (!response.code) {
			if (response && response.items && response.items.length) {
				console.log(response.items);
				var firstAccountId = response.items[2].accountId;
				var firstWebpropertyId = response.items[2].id;
				queryProfiles(firstAccountId, firstWebpropertyId);
			} else {
				updatePage('No webproperties found for this user.');
			}
		} else {
			updatePage('There was an error querying webproperties: ' + response.message);
		}
	}

	function queryProfiles(accountId, webpropertyId) {
		updatePage('Querying Profiles.');
		gapi.client.analytics.management.profiles.list({'accountId': accountId, 'webPropertyId': webpropertyId}).execute(handleProfiles);
	}

	function handleProfiles(response) {
		if (!response.code) {
			if (response && response.items && response.items.length) {
				console.log(response.items);
				var firstProfileId = response.items[0].id;
				queryCoreReportingApi(firstProfileId);
			} else {
				updatePage('No profiles found for this user.');
			}
		} else {
			updatePage('There was an error querying profiles: ' + response.message);
		}
	}

	function queryCoreReportingApi(profileId) {
		updatePage('Querying Core Reporting API.');
		gapi.client.analytics.data.ga.get({
			'ids': 'ga:' + profileId,
			'start-date': lastNDays(14),
			'end-date': lastNDays(0),
			'metrics': 'ga:visits',
			'dimensions': 'ga:source,ga:keyword',
			'sort': '-ga:visits,ga:source',
			'filters': 'ga:medium==organic',
			'max-results': 25
		}).execute(handleCoreReportingResults);
	}

	function handleCoreReportingResults(response) {
		if (!response.code) {
			if (response.rows && response.rows.length) {
				var output = [];

				// Profile Name.
				output.push('Profile Name: ', response.profileInfo.profileName, '<br>');

				var table = ['<table>'];

				// Put headers in table.
				table.push('<tr>');
				for (var i = 0, header; header = response.columnHeaders[i]; ++i) {
					table.push('<th>', header.name, '</th>');
				}
				table.push('</tr>');

				// Put cells in table.
				for (var i = 0, row; row = response.rows[i]; ++i) {
					table.push('<tr><td>', row.join('</td><td>'), '</td></tr>');
				}
				table.push('</table>');

				output.push(table.join(''));
				outputToPage(output.join(''));
			} else {
				outputToPage('No results found.');
			}
		} else {
		updatePage('There was an error querying core reporting API: ' + response.message);
		}
	}

	function outputToPage(output) {
		document.getElementById('output').innerHTML = output;
		console.log(output);
	}

	function updatePage(output) {
		document.getElementById('output').innerHTML += '<br>' + output;
		console.log(output);
	}

	function lastNDays(n) {
		var today = new Date();
		var before = new Date();
		before.setDate(today.getDate() - n);

		var year = before.getFullYear();

		var month = before.getMonth() + 1;
		if (month < 10) {
			month = '0' + month;
		}

		var day = before.getDate();
		if (day < 10) {
			day = '0' + day;
		}

		return [year, month, day].join('-');
	}
})();
