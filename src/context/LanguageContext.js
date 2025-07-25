// context/LanguageContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../utils/i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ru')

  // При изменении языка обновляем localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
    i18n.changeLanguage(language)
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Кастомный хук для удобства
export const useLanguage = () => useContext(LanguageContext)