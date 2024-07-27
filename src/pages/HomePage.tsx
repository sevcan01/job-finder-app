import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import LoginModal from '../components/Auth/LoginModal';
import SignUpModal from '../components/Auth/SignUpModal';
import Header from '../components/Header';

import CustomButton from '../components/CustomButton';

interface SearchFormInputs {
  query: string;
}

const HomePage: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const { register, handleSubmit } = useForm<SearchFormInputs>();

  const onSubmit: SubmitHandler<SearchFormInputs> = (data) => {
    console.log(data.query);
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onSubmit={handleSubmit(onSubmit)} register={register} />
      <main className="flex flex-col bg-white items-end mt-5 mb-5 mr-4">
        <div className="flex space-x-4 mb-1">
          <CustomButton onClick={openLoginModal} buttonColor="white" textColor="black" label="Login" width="100px"/>
          <CustomButton onClick={openSignUpModal} buttonColor="black" textColor="white" label="Sign Up" width="100px" />
        </div>
      </main>
      <section className="w-full p-8 rounded border-t-2 border-black flex-1 text-center bg-[#eeeeee]">
        <h2 className="text-2xl font-bold mb-4 mt-24">Best Position Ever Found</h2>
        <p className="text-black max-w-[30ch] mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </section>
      <footer className="bg-white w-full p-10 shadow space-x-7 border-t-2 border-black">
        <div className="flex gap-3 items-start">
          <div>
            <p className="mt-2 text-xl">ACME</p>
          </div>
          <div className='flex items-end w-full'>
            <div className="w-full border-r-2 border-black pr-4">
              <p className="text-black font-semibold mt-2 break-all">Ready to get started?</p>
              <p className="text-black break-all max-w-[40ch]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="w-full text-center pl-4">
              <p className="text-black">©️ 2010 — 2024 Privacy — Terms</p>
            </div>
          </div>
        </div>
      </footer>
      <div className="w-full h-7 bg-[#9d9a9a] border-black border-t-2" />

      <LoginModal isOpen={isLoginModalOpen} onRequestClose={closeLoginModal} />
      <SignUpModal isOpen={isSignUpModalOpen} onRequestClose={closeSignUpModal} />
    </div>
  );
};

export default HomePage;
