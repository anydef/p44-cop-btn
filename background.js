chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({enable: true}, function() {
    console.log("Extension on");
  });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostEquals: 'nmc-eu12.voc.project44.com'},
    })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});
