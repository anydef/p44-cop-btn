var changeCopy = document.getElementById('copy');

//on init update the UI checkbox based on storage
chrome.storage.sync.get('enabled', function(data) {
  changeCopy.checked=data.enabled;
});

changeCopy.onchange = function(element) {
  let value = this.checked;

  //update the extension storage value
  chrome.storage.sync.set({'enabled': value}, function() {
    console.log('The value is'+ value);
  });

  //Pass init or remove message to content script
  if(value){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {command: "init", enabled: value}, function(response) {
        console.log(response.result);
      });
    });
  }else{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {command: "remove", enabled: value}, function(response) {
        console.log(response.result);
      });
    });
  }

};