import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import pt from './locales/pt.json';
import ar from './locales/ar.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';

// Country code → language mapping
const countryToLang: Record<string, string> = {
  // Spanish
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es',
  VE: 'es', EC: 'es', BO: 'es', PY: 'es', UY: 'es', GT: 'es',
  HN: 'es', SV: 'es', NI: 'es', CR: 'es', PA: 'es', CU: 'es',
  DO: 'es',
  // Portuguese (Brazil)
  BR: 'pt', PT: 'pt',
  // French
  FR: 'fr', BE: 'fr', CH: 'fr', CA: 'fr', SN: 'fr', CI: 'fr',
  CM: 'fr', MG: 'fr', ML: 'fr', BF: 'fr',
  // German
  DE: 'de', AT: 'de', LI: 'de',
  // Arabic
  SA: 'ar', AE: 'ar', EG: 'ar', IQ: 'ar', JO: 'ar', KW: 'ar',
  LB: 'ar', LY: 'ar', MA: 'ar', OM: 'ar', QA: 'ar', SD: 'ar',
  SY: 'ar', TN: 'ar', YE: 'ar',
  // Chinese
  CN: 'zh', TW: 'zh', HK: 'zh', SG: 'zh',
  // Japanese
  JP: 'ja',
};

async function detectLanguageByIP(): Promise<string> {
  try {
    const res = await fetch('/api/geoip');
    const data = await res.json();
    const country = data.countryCode?.toUpperCase();
    if (country) {
      const lang = countryToLang[country] || 'en';
      console.log(`[i18n] Detected country: ${country} → language: ${lang}`);
      return lang;
    }
  } catch {
    // fall through
  }
  return 'en';
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      de: { translation: de },
      pt: { translation: pt },
      ar: { translation: ar },
      zh: { translation: zh },
      ja: { translation: ja },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Language detection ready — disabled until authorised for multi-language deployment
// detectLanguageByIP().then((lang) => { i18n.changeLanguage(lang); });

export default i18n;
