'use strict';

debugger;

document.getElementById('feed-toggle').addEventListener('change', function() {
	browser.tabs.sendMessage(tabs[0].id, {
      command: "toggle"
    });
});