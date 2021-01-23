browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.includes('imdb.com/title')) {
        browser.pageAction.show(tab.id);
    }
});

browser.pageAction.onClicked.addListener(async (tab) => {
    const [movieTitle] = await browser.tabs.executeScript(tab.id, {
        code: 'document.querySelector(\'.title_wrapper\').querySelector(\'h1\').textContent.trim()',
    });
    const url = `https://apis.justwatch.com/content/titles/en_GB/popular?language=en&body={"page_size":1,"page":1,"query":"${movieTitle}","content_types":["show","movie"]}`;
    const response = await fetch(encodeURI(url));
    const data = await response.json();
    const loc = data.items[0].full_path;
    await browser.tabs.update(tab.id, {
        url: encodeURI(`https://www.justwatch.com${loc}`),
    });
});
