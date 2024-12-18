(async() => {
  // eslint-disable-next-line no-undef
  const src = chrome.runtime.getURL('content-main.js');
  await import(src);
})()