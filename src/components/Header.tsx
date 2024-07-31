import React from 'react';
import LanguageSwitcher from '../i18n/locales/LanguageSwitcher';

const Header: React.FC = () => {
  return (
    <header className="bg-[#9d9a9a] w-full shadow h-20 flex items-center justify-between border-b-2 border-black fixed top-0 left-0 z-10 px-4">
      <span className=' font-bold ml-4'>JOB FINDER</span>
      <LanguageSwitcher />
    </header>
  );
};

export default Header;
