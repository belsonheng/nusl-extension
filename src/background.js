function setNotification(expiry) {
	time = expiry - (15*60*1000);
	if (Date.now() < time) {
		console.log('notification scheduled at ' + new Date(time));
		chrome.alarms.create('reminder', {
			when: time
		});
	}
	if (Date.now() < expiry) {
		console.log('logout scheduled at ' + new Date(expiry));
		chrome.alarms.create('logout', {
			when: expiry
		});
	}
}

chrome.alarms.onAlarm.addListener(function(alarm) {
  console.log('notification ' + alarm.name + ' activated');
	if (alarm.name == 'reminder') {
		chrome.notifications.create('reminder', {
			type: 'basic',
			iconUrl: 'assets/icons/notification.png',
			title: 'Reminder',
			message: "You have 15 minutes remaining.",
			// requireInteraction: true
		});
	}
	else if (alarm.name == 'logout') {
		console.log('Signing out...');
		// Send message to popup if it's loaded
		chrome.runtime.sendMessage({ message: 'logout' }, (response) => {
			if (response === undefined) {
				req = new XMLHttpRequest();
				req.open(
					'GET',
					'http://cjn3.stf.nus.edu.sg/api/v1/auth/logout'
				);
				req.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('accessToken'));
				req.send();
			}
			localStorage.removeItem('isAuthorise');
			localStorage.removeItem('accessToken');
		});
		clearBrowsingData();
	}
});

chrome.windows.onCreated.addListener(function() {
	chrome.windows.getAll({}, function(windows) {
		console.log('Number of windows opened: ' + windows.length);
	});
});

chrome.windows.onRemoved.addListener(function() {
	chrome.windows.getAll({}, function(windows) {
    console.log('Number of windows opened: ' + windows.length);
		if (windows.length === 0) {
			console.log('All windows are closed!');
			clearBrowsingData();
    }
	});
});

function clearBrowsingData() {
	console.log('removing browsing data');
	chrome.browsingData.remove({
		"originTypes": {
			"protectedWeb": false,
			"unprotectedWeb": true,
			"extension": false
		}
	}, {
		"appcache": true,
		"cache": true,
		"cookies": true,
		"downloads": true,
		"fileSystems": true,
		"formData": true,
		"history": true,
		"indexedDB": true,
		"localStorage": true,
		"pluginData": true,
		"passwords": true,
		"webSQL": true
	});
}
