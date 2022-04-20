const psl = require('psl');

let url = '';
const getCompany = (url) => {
  // parser can't parse slashes, so gotta get rid of paths
  url = url.split('/')[2];

  const parsed = psl.parse(url).sld;

  // Need the company with the first letter capped
  const company = parsed.charAt(0).toUpperCase() + parsed.slice(1);

  return company;
};

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
    sendResponse(getCompany(url));
    console.log('got message', url);
    console.log('company', getCompany(url));
  }
});
