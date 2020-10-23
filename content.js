const button = (id, text) => {
  console.log(id, text);
  return `<button id="copyBtn-${id}" style="margin-left: 10px;" onclick='const tempInput = "input";
          const temp = document.createElement(tempInput);
          temp.value = "${text}";
          document.body.appendChild(temp);
          const selected = temp.select();
          document.execCommand("copy");
          temp.remove();'>Copy</button>`;
};

const addListeners = () => {
  $('div#subcontractors-list-data-location-body div.margin-bottom-4>span.company-values').each(function(index) {
    $(this).after(button(index, $(this).text()));
  });
};

const removeListeners = () => {
  $('div#subcontractors-list-data-location-body div.margin-bottom-4>span.company-values').each(index => {
    $(`#copyBtn-${index}`).remove();
  });
};
//message listener for background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Adding Listener');
  if (request.command === 'init') {
    addListeners();
  }
  if (request.command === 'remove') {
    removeListeners();
  }
  sendResponse({ result: 'success' });
});

// //on init perform based on chrome stroage value
window.onload = () => {
  chrome.storage.sync.get('enabled', data => {
    if (data.enabled) {
      addListeners();
    } else {
      removeListeners();
    }
  });
};