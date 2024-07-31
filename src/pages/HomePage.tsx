import React, { useState } from 'react';
import LoginModal from '../components/Auth/LoginModal';
import SignUpModal from '../components/Auth/SignUpModal';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const { t } = useTranslation();

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  return (
    <>
      <Header />
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col md:flex-row justify-between items-center flex-shrink-0 h-36 ">
        <div className='ml-10 md:mb-0'>
          <p className="mt-16 text-xl">ACME</p>
        </div>
        <div className="flex space-x-4 mt-16">
          <CustomButton onClick={openLoginModal} buttonColor="white" textColor="black" label={t('login')} width="100px" />
          <CustomButton onClick={openSignUpModal} buttonColor="black" textColor="white" label={t('signup')} width="100px" />
        </div>
      </main>
      <section className="w-full p-4 rounded border-t-2 border-black flex-grow text-center bg-[#eeeeee]">
        <h2 className="text-2xl font-bold mb-4 mt-24">{t('best_position_found')}</h2>
        <p className="text-black max-w-[30ch] mx-auto">
          {t('intro_message')}
        </p>
      </section>
      <footer className="bg-white w-full p-10 shadow border-t-2 border-black mt-auto">
        <div className="flex flex-col md:flex-row gap-3 items-start">
          <div className="mb-4 md:mb-0">
            <p className="mt-2 text-xl">ACME</p>
          </div>
          <div className='flex flex-col md:flex-row items-start md:items-end w-full'>
            <div className="w-full md:w-1/2 border-b-2 md:border-b-0 md:border-r-2 border-black pr-4 mb-4 md:mb-0">
              <p className="text-black font-semibold mt-2 break-all">{t('ready_to_get_started')}</p>
              <p className="text-black break-all max-w-[40ch]">
                {t('footer_message')}
              </p>
            </div>
            <div className="w-full md:w-1/2 text-center pl-4">
              <p className="text-black">©️ 2010 — 2024 {t('privacy')} — {t('terms')}</p>
            </div>
          </div>
        </div>
      </footer>
      <div className="w-full h-7 bg-[#9d9a9a] border-black border-t-2" />
      <LoginModal isOpen={isLoginModalOpen} onRequestClose={closeLoginModal} />
      <SignUpModal isOpen={isSignUpModalOpen} onRequestClose={closeSignUpModal} />
    </div>
    </>
  );
};

export default HomePage;
