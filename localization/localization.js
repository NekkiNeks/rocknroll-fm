import LocalizedStrings from 'react-native-localization';
import english from './en.js';
import russian from './ru.js';

export const strings = new LocalizedStrings({
  ru: russian,
  en: english,
});

export const changeLanguage = languageKey => {
  const currentLanguage = strings.getLanguage();
  const currentInterfaceLanguage = strings.getInterfaceLanguage();
  console.log(currentLanguage, currentInterfaceLanguage);
  strings.setLanguage(languageKey);
};
