browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.includes('imdb.com/title')) {
        browser.pageAction.show(tab.id);
    }
});

browser.pageAction.onClicked.addListener(async (tab) => {
    let [movieTitle] = await browser.tabs.executeScript(tab.id, {
        code: 'document.querySelector(\'[class^=TitleHeader__TitleText]\').textContent.trim()',
    });

    // NOTE: IMDb has used non-breaking spaces in titles in the past, this is out-dated code but
    // might as well leave it. Replaces all whitespace chars with ' '.
    movieTitle = movieTitle.replace(/\s/g, ' ');

    const url = `https://apis.justwatch.com/content/titles/en_GB/popular?language=en&body={"page_size":1,"page":1,"query":"${movieTitle}","content_types":["show","movie"]}`;
    const response = await fetch(encodeURI(url));
    const data = await response.json();

    const loc = data.items[0].full_path;
    await browser.tabs.update(tab.id, {
        url: `https://www.justwatch.com${loc}`,
    });
});
