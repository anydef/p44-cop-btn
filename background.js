chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ enabled: true }, () => {
  });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'nmc-eu12.voc.project44.com' },
    })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});
