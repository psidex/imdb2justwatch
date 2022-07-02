"""Use localeplanet.com to download titles for each locale.
Doesn't produce a perfect output, output requires some manual cleaning.
"""

from time import sleep

import bs4
import requests

url = "https://www.localeplanet.com/icu/{}/index.html"

# Extracted from justwatch.com source code
locales = [
    "ca-AD",
    "ar-AE",
    "en-AG",
    "sq-AL",
    "es-AR",
    "de-AT",
    "en-AU",
    "bs-BA",
    "en-BB",
    "fr-BE",
    "bg-BG",
    "ar-BH",
    "en-BM",
    "es-BO",
    "pt-BR",
    "en-BS",
    "en-CA",
    "de-CH",
    "fr-CI",
    "es-CL",
    "es-CO",
    "es-CR",
    "es-CU",
    "pt-CV",
    "cs-CZ",
    "de-DE",
    "en-DK",
    "es-DO",
    "ar-DZ",
    "es-EC",
    "et-EE",
    "ar-EG",
    "es-ES",
    "fi-FI",
    "en-FJ",
    "fr-FR",
    "fr-GF",
    "en-GG",
    "en-GH",
    "en-GI",
    "es-GQ",
    "el-GR",
    "es-GT",
    "zh-HK",
    "es-HN",
    "hr-HR",
    "hu-HU",
    "en-ID",
    "en-IE",
    "he-IL",
    "en-IN",
    "ar-IQ",
    "is-IS",
    "it-IT",
    "en-JM",
    "ar-JO",
    "ja-JP",
    "en-KE",
    "ko-KR",
    "ar-KW",
    "ar-LB",
    "en-LC",
    "de-LI",
    "lt-LT",
    "lv-LV",
    "ar-LY",
    "ar-MA",
    "fr-MC",
    "ro-MD",
    "mk-MK",
    "mt-MT",
    "fr-MU",
    "es-MX",
    "en-MY",
    "pt-MZ",
    "fr-NE",
    "en-NG",
    "en-NL",
    "en-NO",
    "en-NZ",
    "ar-OM",
    "es-PA",
    "es-PE",
    "fr-PF",
    "en-PH",
    "ur-PK",
    "pl-PL",
    "ar-PS",
    "pt-PT",
    "es-PY",
    "ar-QA",
    "ro-RO",
    "sr-RS",
    "ru-RU",
    "ar-SA",
    "fr-SC",
    "sv-SE",
    "en-SG",
    "sk-SK",
    "sl-SL",
    "it-SM",
    "fr-SN",
    "es-SV",
    "en-TC",
    "en-TH",
    "ar-TN",
    "tr-TR",
    "en-TT",
    "zh-TW",
    "en-UG",
    "en-GB",
    "en-US",
    "es-UY",
    "it-VA",
    "es-VE",
    "sq-XK",
    "ar-YE",
    "en-ZA",
    "en-ZM",
    "fr-NE",
]

result = {}

for i, l in enumerate(locales):
    try:
        print(f"[{i+1}/{len(locales)}] Processing {l}")
        r = requests.get(url.format(l))
        html = bs4.BeautifulSoup(r.text)
        title = html.title.text.replace("ICU Locale “", "")
        title = title[: title.index("”")]
        result[title] = l.replace("-", "_")
    except Exception as e:
        print(f"Tried {l}, got status {r.status_code}, failed with: {e}")
        f = l.replace("-", "_")
        result[f] = f
    sleep(1)

print("\n---\n")
print(result)
