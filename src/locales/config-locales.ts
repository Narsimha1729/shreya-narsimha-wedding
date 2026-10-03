export const fallbackLng = 'en';
export const languages = ['en', 'kn'];
export const defaultNS = 'common';
export const cookieName = 'i18next';

// ----------------------------------------------------------------------

export function i18nOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    lng,
    fallbackLng,
    ns,
    defaultNS,
    fallbackNS: defaultNS,
    supportedLngs: languages,
  };
}

// ----------------------------------------------------------------------

export const changeLangMessages = {
  kn: {
    success: 'ಭಾಷೆ ಬದಲಾಗಿದೆ',
    error: 'ಭಾಷೆ ಬದಲಾಯಿಸುವಾಗ ದೋಷ',
    loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
  },
  en: {
    success: 'Language has been changed!',
    error: 'Error changing language!',
    loading: 'Loading...',
  },
};
