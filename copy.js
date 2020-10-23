const changeCopy = document.getElementById('copy');

//on init update the UI checkbox based on storage
chrome.storage.sync.get('enabled', data => {
  changeCopy.checked = data.enabled;
});

changeCopy.onchange = function(_element) {
  const checked = this.checked;
  chrome.storage.sync.set({ 'enabled': checked }, () => {});
  const command = checked ? 'init' : 'remove';
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { command: command, enabled: checked }, () => {});
  });


};