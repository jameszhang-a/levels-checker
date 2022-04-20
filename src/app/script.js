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
    document.getElementById(
      'result'
    ).innerHTML = `<a href='https://www.levels.fyi/company/Amazon'>${company}</a>`;
  }
}
fetchData();

chrome.runtime.sendMessage('get-url', (res) => {
  // 3. Got an asynchronous response with the data from the background
  console.log('received user data', res);
  url = res;
  document.getElementById('url').innerHTML = `${url}`;
});
