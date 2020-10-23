const button = (id, text) => {
  const wrapper = document.createElement('div');
  wrapper.id = 'copyBtn-${id}';
  wrapper.style = 'display: inline;margin-left: 10px;'
  wrapper.innerHTML =
    `<button onclick='const tempInput = "input";
          const temp = document.createElement(tempInput);
          temp.value = "${text}";
          document.body.appendChild(temp);
          const selected = temp.select();
          document.execCommand("copy");
          temp.remove();'>Copy</button>`;
  return wrapper;
};

const addListeners = () => {
  document.querySelectorAll('div#subcontractors-list-data-location-body div.margin-bottom-4>span.company-values').forEach((elem, index) => {
    elem.after(button(index, elem.textContent));
  });
};

const removeListeners = () => {
  document.querySelectorAll('div#subcontractors-list-data-location-body div.margin-bottom-4>span.company-values').forEach((_elem, index) => {
    document.querySelectorAll(`#copyBtn-${index}`).forEach(elem => elem.remove());
  });
};
//message listener for background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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