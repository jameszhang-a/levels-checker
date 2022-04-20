let url = '';

// const getCompany = (url) => {
//   const parsed = a.parse(url);
//   return parsed.sld;
// };

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    url = tab.url;
    console.log('you are here: ' + url);
  });
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  if (tab.active && change.url) {
    console.log('you are here: ' + change.url);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 2. A page requested user data, respond with a copy of `user`
  if (message === 'get-url') {
    sendResponse(url);
  }
});
