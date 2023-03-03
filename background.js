const getTitleScript = `
(() => {
    const possibleSelectors = [
        'h1[data-testid="hero-title-block__title"]',
        'h1[data-testid="hero__pageTitle"]',
    ];
    for (const selector of possibleSelectors) {
        try {
            return document.querySelector(selector).textContent.trim();
        } catch {
            // pass
        }
    }
    return '';
})();
`;

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.includes('imdb.com/title')) {
        browser.pageAction.show(tab.id);
    }
});

browser.pageAction.onClicked.addListener(async (tab) => {
    // NOTE: The CSS selector has changed before and probably will again
    let [movieTitle] = await browser.tabs.executeScript(tab.id, {
        code: getTitleScript,
    });

    // NOTE: IMDb has used non-breaking spaces in titles in the past, this is out-dated code but
    // might as well leave it. Replaces all whitespace chars with ' '.
    movieTitle = movieTitle.replace(/\s/g, ' ');

    let { locale } = await browser.storage.sync.get('locale');
    if (locale === undefined || locale === null || locale === '') {
        locale = 'en_GB';
    }

    const url = `https://apis.justwatch.com/content/titles/${locale}/popular?language=en&body={"page_size":1,"page":1,"query":"${movieTitle}","content_types":["show","movie"]}`;
    const response = await fetch(encodeURI(url));
    const data = await response.json();

    const loc = data.items[0].full_path;
    await browser.tabs.update(tab.id, {
        url: `https://www.justwatch.com${loc}`,
    });
});
