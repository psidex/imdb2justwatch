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
    let [movieTitle] = await browser.tabs.executeScript(tab.id, {
        code: getTitleScript,
    });

    // IMDb has used non-breaking spaces in titles in the past.
    // Replaces all whitespace chars with ' '.
    movieTitle = movieTitle.replace(/\s/g, ' ');

    let { locale, openInNewTab } = await browser.storage.sync.get(['locale', 'openInNewTab']);

    if (locale === undefined || locale === null || locale === '') {
        locale = 'en_GB';
    }
    if (openInNewTab === undefined || openInNewTab === null || openInNewTab === '') {
        openInNewTab = false;
    }

    const url = `https://apis.justwatch.com/content/titles/${locale}/popular?language=en&body={"page_size":1,"page":1,"query":"${movieTitle}","content_types":["show","movie"]}`;
    const response = await fetch(encodeURI(url));
    const data = await response.json();

    const loc = data.items[0].full_path;
    const opts = { url: `https://www.justwatch.com${loc}` };

    if (openInNewTab === true) {
        await browser.tabs.create(opts);
    } else {
        await browser.tabs.update(tab.id, opts);
    }
});
