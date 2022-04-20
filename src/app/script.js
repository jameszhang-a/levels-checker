let url = '';
const result = document.getElementById('result');

const checkSalary = (company) => {
  console.log('button clicked');
  chrome.tabs.create({
    url    : `https://www.levels.fyi/comp.html?track=Software%20Engineer&search=${company}`,
    active : false
  });
};

async function fetchData() {
  const company = url;

  const res = await fetch(
    `https://api.levels.fyi/v1/search/entity?searchText=${company}`
  );

  // Invalid query
  if (res.status >= 400) {
    result.innerHTML = 'Not available';
    return;
  }

  const { payload } = await res.json();

  // response when the company doesn't exist
  if (payload === 'I9DW+hnEyOhcwFdtrpUWEA==') {
    result.innerHTML = 'Not available';
  } else {
    // if the company exists, have button that goes to the info page

    const gotoButton = document.createElement('button');
    gotoButton.appendChild(document.createTextNode(`Go to ${company}`));
    gotoButton.onclick = () => checkSalary(company);

    result.appendChild(gotoButton);
  }
}

chrome.runtime.sendMessage('get-url', (res) => {
  console.log('received user data', res);
  url = res;
  fetchData();
});
