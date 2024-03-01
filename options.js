/* eslint-disable quote-props */

const locales = {
    'Catalan (Andorra)': 'AD',
    'Arabic (United Arab Emirates)': 'AE',
    'English (Antigua & Barbuda)': 'AG',
    'Albanian (Albania)': 'AL',
    'Spanish (Argentina)': 'AR',
    'German (Austria)': 'AT',
    'English (Australia)': 'AU',
    'Bosnian (Bosnia and Herzegovina)': 'BA',
    'English (Barbados)': 'BB',
    'French (Belgium)': 'BE',
    'Bulgarian (Bulgaria)': 'BG',
    'Arabic (Bahrain)': 'BH',
    'English (Bermuda)': 'BM',
    'Spanish (Bolivia)': 'BO',
    'Portuguese (Brazil)': 'BR',
    'English (Bahamas)': 'BS',
    'English (Canada)': 'CA',
    'German (Switzerland)': 'CH',
    'French (Côte d’Ivoire)': 'CI',
    'Spanish (Chile)': 'CL',
    'Spanish (Colombia)': 'CO',
    'Spanish (Costa Rica)': 'CR',
    'Spanish (Cuba)': 'CU',
    'Portuguese (Cape Verde)': 'CV',
    'Czech (Czechia)': 'CZ',
    'German (Germany)': 'DE',
    'English (Denmark)': 'DK',
    'Spanish (Dominican Republic)': 'DO',
    'Arabic (Algeria)': 'DZ',
    'Spanish (Ecuador)': 'EC',
    'Estonian (Estonia)': 'EE',
    'Arabic (Egypt)': 'EG',
    'Spanish (Spain)': 'ES',
    'Finnish (Finland)': 'FI',
    'English (Fiji)': 'FJ',
    'French (France)': 'FR',
    'French (French Guiana)': 'GF',
    'English (Guernsey)': 'GG',
    'English (Ghana)': 'GH',
    'English (Gibraltar)': 'GI',
    'Spanish (Equatorial Guinea)': 'GQ',
    'Greek (Greece)': 'GR',
    'Spanish (Guatemala)': 'GT',
    'Chinese (Hong Kong)': 'HK',
    'Spanish (Honduras)': 'HN',
    'Croatian (Croatia)': 'HR',
    'Hungarian (Hungary)': 'HU',
    'English (Indonesia)': 'ID',
    'English (Ireland)': 'IE',
    'Hebrew (Israel)': 'IL',
    'English (India)': 'IN',
    'Arabic (Iraq)': 'IQ',
    'Icelandic (Iceland)': 'IS',
    'Italian (Italy)': 'IT',
    'English (Jamaica)': 'JM',
    'Arabic (Jordan)': 'JO',
    'Japanese (Japan)': 'JP',
    'English (Kenya)': 'KE',
    'Korean (South Korea)': 'KR',
    'Arabic (Kuwait)': 'KW',
    'Arabic (Lebanon)': 'LB',
    'English (St. Lucia)': 'LC',
    'German (Liechtenstein)': 'LI',
    'Lithuanian (Lithuania)': 'LT',
    'Latvian (Latvia)': 'LV',
    'Arabic (Libya)': 'LY',
    'Arabic (Morocco)': 'MA',
    'French (Monaco)': 'MC',
    'Moldavian': 'MD',
    'Macedonian (Macedonia)': 'MK',
    'Maltese (Malta)': 'MT',
    'French (Mauritius)': 'MU',
    'Spanish (Mexico)': 'MX',
    'English (Malaysia)': 'MY',
    'Portuguese (Mozambique)': 'MZ',
    'French (Niger)': 'NE',
    'English (Nigeria)': 'NG',
    'English (Netherlands)': 'NL',
    'English (Norway)': 'NO',
    'English (New Zealand)': 'NZ',
    'Arabic (Oman)': 'OM',
    'Spanish (Panama)': 'PA',
    'Spanish (Peru)': 'PE',
    'French (French Polynesia)': 'PF',
    'English (Philippines)': 'PH',
    'Urdu (Pakistan)': 'PK',
    'Polish (Poland)': 'PL',
    'Arabic (Palestinian Territories)': 'PS',
    'Portuguese (Portugal)': 'PT',
    'Spanish (Paraguay)': 'PY',
    'Arabic (Qatar)': 'QA',
    'Romanian (Romania)': 'RO',
    'Serbian (Serbia)': 'RS',
    'Russian (Russia)': 'RU',
    'Arabic (Saudi Arabia)': 'SA',
    'French (Seychelles)': 'SC',
    'Swedish (Sweden)': 'SE',
    'English (Singapore)': 'SG',
    'Slovak (Slovakia)': 'SK',
    'Slovenian (Slovenia)': 'SL',
    'Italian (San Marino)': 'SM',
    'French (Senegal)': 'SN',
    'Spanish (El Salvador)': 'SV',
    'English (Turks & Caicos Islands)': 'TC',
    'English (Thailand)': 'TH',
    'Arabic (Tunisia)': 'TN',
    'Turkish (Turkey)': 'TR',
    'English (Trinidad & Tobago)': 'TT',
    'Chinese (Taiwan)': 'TW',
    'English (Uganda)': 'UG',
    'English (Great Britain)': 'GB',
    'English (United States)': 'US',
    'Spanish (Uruguay)': 'UY',
    'Italian (Vatican City)': 'VA',
    'Spanish (Venezuela)': 'VE',
    'Albanian (Kosovo)': 'XK',
    'Arabic (Yemen)': 'YE',
    'English (South Africa)': 'ZA',
    'English (Zambia)': 'ZM',
};

document.addEventListener('DOMContentLoaded', async () => {
    const localeOptions = document.querySelector('#locale');
    const openinnewtabInput = document.querySelector('#openinnewtab');

    for (const title of Object.keys(locales).sort()) {
        const option = document.createElement('option');
        option.value = locales[title];
        option.innerHTML = title;
        localeOptions.appendChild(option);
    }

    localeOptions.addEventListener('change', () => {
        const selected = localeOptions.options[localeOptions.selectedIndex].value;
        browser.storage.sync.set({ locale: selected });
    });

    openinnewtabInput.addEventListener('change', () => {
        const { checked } = openinnewtabInput;
        browser.storage.sync.set({ openInNewTab: checked });
    });

    let { locale, openInNewTab } = await browser.storage.sync.get(['locale', 'openInNewTab']);

    if (locale === undefined || locale === null || locale === '') {
        locale = 'GB';
        browser.storage.sync.set({ locale });
    }
    if (locale.includes('_')) {
        [, locale] = locale.split('_');
    }
    if (openInNewTab === undefined || openInNewTab === null || openInNewTab === '') {
        openInNewTab = false;
        browser.storage.sync.set({ openInNewTab });
    }

    localeOptions.value = locale;
    openinnewtabInput.checked = openInNewTab;
});
