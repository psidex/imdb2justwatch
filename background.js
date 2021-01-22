browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const url = new URL(tab.url);
    if (url.href.includes('imdb.com/title')) {
        browser.pageAction.show(tab.id);
    }
});

browser.pageAction.onClicked.addListener(() => {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        const tab = tabs[0];
        const movieTitle = tab.title.replace(' - IMDb', '');

        const url = `https://apis.justwatch.com/content/titles/en_GB/popular?language=en&body={"page_size":1,"page":1,"query":"${movieTitle}","content_types":["show","movie"]}`;
        fetch(encodeURI(url))
            .then((response) => response.json())
            .then((data) => {
                const loc = encodeURI(data.items[0].full_path);
                browser.tabs.update(tab.id, { url: `https://www.justwatch.com${loc}` });
            });
    });
});
