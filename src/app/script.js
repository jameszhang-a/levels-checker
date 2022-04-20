let url = '';

async function fetchData() {
  const company = url;

  const res = await fetch(
    `https://api.levels.fyi/v1/search/entity?searchText=${company}`
  );

  console.log(res.status);
  console.log('in here');
  if (res.status >= 400) {
    document.getElementById('result').innerHTML = 'Not available';
    return;
  }

  const { payload } = await res.json();

  if (payload === 'I9DW+hnEyOhcwFdtrpUWEA==') {
    document.getElementById('result').innerHTML = 'Not available';
  } else {
    // document.getElementById(
    //   'result'
    // ).innerHTML = `<a href='https://www.levels.fyi/company/Amazon'>${company}</a>`;
    let anchor = document.createElement('a');
    let link = document.createTextNode(`Check out ${company}`);
    anchor.appendChild(link);
    anchor.href = `https://www.levels.fyi/comp.html?track=Software%20Engineer&search=${company}`;
    anchor.target = '_blank';
    chrome.tabs.create({ url: 'http://www.google.com', active: false });

    document.getElementById('container').appendChild(anchor);
  }
}

chrome.runtime.sendMessage('get-url', (res) => {
  // 3. Got an asynchronous response with the data from the background
  console.log('received user data', res);
  url = res;
  document.getElementById('url').innerHTML = `${url}`;
  fetchData();
});
