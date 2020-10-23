var addListeners=function(){
  $(".company-values").each(function( index ) {
    console.log( index + ": " + $(this).text() );
  });
}

//message listener for background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
  if(request.command === 'init'){
    addListeners();
  }
  sendResponse({result: "success"});
});

//on init perform based on chrome stroage value
window.onload=function(){
  chrome.storage.sync.get('enabled', function(data) {
    if (data.enabled) {
      addListeners();
    }
  });
}