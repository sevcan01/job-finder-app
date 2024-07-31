
import React from 'react';
import { useTranslation } from 'react-i18next';


const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-start">
      <img
        src='/translate-svgrepo-com.svg'
        alt="Google Translate"
        className="w-6 h-6 cursor-pointer"
        onClick={() => changeLanguage(i18n.language === 'en' ? 'tr' : 'en')}
      />
      <span className="ml-2">{i18n.language === 'en' ? 'Türkçe' : 'English'}</span>
    </div>
  );
};

export default LanguageSwitcher;
