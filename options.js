/* eslint-disable quote-props */

const locales = {
    'Catalan (Andorra)': 'ca_AD',
    'Arabic (United Arab Emirates)': 'ar_AE',
    'English (Antigua & Barbuda)': 'en_AG',
    'Albanian (Albania)': 'sq_AL',
    'Spanish (Argentina)': 'es_AR',
    'German (Austria)': 'de_AT',
    'English (Australia)': 'en_AU',
    'Bosnian (Bosnia and Herzegovina)': 'bs_BA',
    'English (Barbados)': 'en_BB',
    'French (Belgium)': 'fr_BE',
    'Bulgarian (Bulgaria)': 'bg_BG',
    'Arabic (Bahrain)': 'ar_BH',
    'English (Bermuda)': 'en_BM',
    'Spanish (Bolivia)': 'es_BO',
    'Portuguese (Brazil)': 'pt_BR',
    'English (Bahamas)': 'en_BS',
    'English (Canada)': 'en_CA',
    'German (Switzerland)': 'de_CH',
    'French (Côte d’Ivoire)': 'fr_CI',
    'Spanish (Chile)': 'es_CL',
    'Spanish (Colombia)': 'es_CO',
    'Spanish (Costa Rica)': 'es_CR',
    'Spanish (Cuba)': 'es_CU',
    'Portuguese (Cape Verde)': 'pt_CV',
    'Czech (Czechia)': 'cs_CZ',
    'German (Germany)': 'de_DE',
    'English (Denmark)': 'en_DK',
    'Spanish (Dominican Republic)': 'es_DO',
    'Arabic (Algeria)': 'ar_DZ',
    'Spanish (Ecuador)': 'es_EC',
    'Estonian (Estonia)': 'et_EE',
    'Arabic (Egypt)': 'ar_EG',
    'Spanish (Spain)': 'es_ES',
    'Finnish (Finland)': 'fi_FI',
    'English (Fiji)': 'en_FJ',
    'French (France)': 'fr_FR',
    'French (French Guiana)': 'fr_GF',
    'English (Guernsey)': 'en_GG',
    'English (Ghana)': 'en_GH',
    'English (Gibraltar)': 'en_GI',
    'Spanish (Equatorial Guinea)': 'es_GQ',
    'Greek (Greece)': 'el_GR',
    'Spanish (Guatemala)': 'es_GT',
    'Chinese (Hong Kong)': 'zh_HK',
    'Spanish (Honduras)': 'es_HN',
    'Croatian (Croatia)': 'hr_HR',
    'Hungarian (Hungary)': 'hu_HU',
    'English (Indonesia)': 'en_ID',
    'English (Ireland)': 'en_IE',
    'Hebrew (Israel)': 'he_IL',
    'English (India)': 'en_IN',
    'Arabic (Iraq)': 'ar_IQ',
    'Icelandic (Iceland)': 'is_IS',
    'Italian (Italy)': 'it_IT',
    'English (Jamaica)': 'en_JM',
    'Arabic (Jordan)': 'ar_JO',
    'Japanese (Japan)': 'ja_JP',
    'English (Kenya)': 'en_KE',
    'Korean (South Korea)': 'ko_KR',
    'Arabic (Kuwait)': 'ar_KW',
    'Arabic (Lebanon)': 'ar_LB',
    'English (St. Lucia)': 'en_LC',
    'German (Liechtenstein)': 'de_LI',
    'Lithuanian (Lithuania)': 'lt_LT',
    'Latvian (Latvia)': 'lv_LV',
    'Arabic (Libya)': 'ar_LY',
    'Arabic (Morocco)': 'ar_MA',
    'French (Monaco)': 'fr_MC',
    'Moldavian': 'ro_MD',
    'Macedonian (Macedonia)': 'mk_MK',
    'Maltese (Malta)': 'mt_MT',
    'French (Mauritius)': 'fr_MU',
    'Spanish (Mexico)': 'es_MX',
    'English (Malaysia)': 'en_MY',
    'Portuguese (Mozambique)': 'pt_MZ',
    'French (Niger)': 'fr_NE',
    'English (Nigeria)': 'en_NG',
    'English (Netherlands)': 'en_NL',
    'English (Norway)': 'en_NO',
    'English (New Zealand)': 'en_NZ',
    'Arabic (Oman)': 'ar_OM',
    'Spanish (Panama)': 'es_PA',
    'Spanish (Peru)': 'es_PE',
    'French (French Polynesia)': 'fr_PF',
    'English (Philippines)': 'en_PH',
    'Urdu (Pakistan)': 'ur_PK',
    'Polish (Poland)': 'pl_PL',
    'Arabic (Palestinian Territories)': 'ar_PS',
    'Portuguese (Portugal)': 'pt_PT',
    'Spanish (Paraguay)': 'es_PY',
    'Arabic (Qatar)': 'ar_QA',
    'Romanian (Romania)': 'ro_RO',
    'Serbian (Serbia)': 'sr_RS',
    'Russian (Russia)': 'ru_RU',
    'Arabic (Saudi Arabia)': 'ar_SA',
    'French (Seychelles)': 'fr_SC',
    'Swedish (Sweden)': 'sv_SE',
    'English (Singapore)': 'en_SG',
    'Slovak (Slovakia)': 'sk_SK',
    'Slovenian (Slovenia)': 'sl_SL',
    'Italian (San Marino)': 'it_SM',
    'French (Senegal)': 'fr_SN',
    'Spanish (El Salvador)': 'es_SV',
    'English (Turks & Caicos Islands)': 'en_TC',
    'English (Thailand)': 'en_TH',
    'Arabic (Tunisia)': 'ar_TN',
    'Turkish (Turkey)': 'tr_TR',
    'English (Trinidad & Tobago)': 'en_TT',
    'Chinese (Taiwan)': 'zh_TW',
    'English (Uganda)': 'en_UG',
    'English (Great Britain)': 'en_GB',
    'English (United States)': 'en_US',
    'Spanish (Uruguay)': 'es_UY',
    'Italian (Vatican City)': 'it_VA',
    'Spanish (Venezuela)': 'es_VE',
    'Albanian (Kosovo)': 'sq_XK',
    'Arabic (Yemen)': 'ar_YE',
    'English (South Africa)': 'en_ZA',
    'English (Zambia)': 'en_ZM',
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
        locale = 'en_GB';
        browser.storage.sync.set({ locale });
    }
    if (openInNewTab === undefined || openInNewTab === null || openInNewTab === '') {
        openInNewTab = false;
        browser.storage.sync.set({ openInNewTab });
    }

    localeOptions.value = locale;
    openinnewtabInput.checked = openInNewTab;
});
