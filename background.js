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

async function queryJustWatch(locale, movieTitle) {
    const response = await fetch('https://apis.justwatch.com/graphql', {
        credentials: 'omit',
        headers: {
            Accept: '*/*',
            'content-type': 'application/json',
        },
        referrer: 'https://www.justwatch.com/',
        // body taken from justwatch.com search box
        body: `{"operationName":"GetSuggestedTitles","variables":{"country":"${locale}","language":"en","first":1,"filter":{"searchQuery":"${movieTitle}"}},"query":"query GetSuggestedTitles($country: Country!, $language: Language!, $first: Int!, $filter: TitleFilter) {\\n  popularTitles(country: $country, first: $first, filter: $filter) {\\n    edges {\\n      node {\\n        ...SuggestedTitle\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment SuggestedTitle on MovieOrShow {\\n  id\\n  objectType\\n  objectId\\n  content(country: $country, language: $language) {\\n    fullPath\\n    title\\n    originalReleaseYear\\n    posterUrl\\n    fullPath\\n    __typename\\n  }\\n  watchNowOffer(country: $country, platform: WEB) {\\n    id\\n    standardWebURL\\n    package {\\n      id\\n      packageId\\n      __typename\\n    }\\n    __typename\\n  }\\n  offers(country: $country, platform: WEB) {\\n    monetizationType\\n    presentationType\\n    standardWebURL\\n    package {\\n      id\\n      packageId\\n      __typename\\n    }\\n    id\\n    __typename\\n  }\\n  __typename\\n}\\n"}`,
        method: 'POST',
        mode: 'cors',
    });
    const obj = await response.json();
    const loc = obj.data.popularTitles.edges[0].node.content.fullPath;
    return `https://www.justwatch.com${loc}`;
}

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
        locale = 'GB';
    }
    if (locale.includes('_')) {
        // Convert old-style (en_GB) to new style (GB)
        [, locale] = locale.split('_');
    }
    if (openInNewTab === undefined || openInNewTab === null || openInNewTab === '') {
        openInNewTab = false;
    }

    const url = await queryJustWatch(locale, movieTitle);
    const opts = { url };

    if (openInNewTab === true) {
        await browser.tabs.create(opts);
    } else {
        await browser.tabs.update(tab.id, opts);
    }
});
