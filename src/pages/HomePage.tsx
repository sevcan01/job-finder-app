import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import LoginModal from '../components/Auth/LoginModal';
import SignUpModal from '../components/Auth/SignUpModal';



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
      <header className="bg-[#9d9a9a] w-full shadow p-4 flex items-center border-b-2 border-black">
        <div className="flex items-center space-x-2">
          <div className="p-2">
            <img src="/left.svg" alt="Back" width={30} />
          </div>
          <div className="p-2">
            <img src="/right.svg" width={30} alt="Forward" />
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4 mr-4">
          <div className="p-2">
            <img src="/path-to-close-icon.svg" width={30} alt="Close" />
          </div>
          <div className="p-2">
            <img src="/path-to-home-icon.svg" alt="Home" width={30} />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="ml-auto flex items-center w-full bg-white p-2 rounded mr-2">
          <input
            {...register('query')}
            type="text"
            placeholder="https://"
            className="flex-grow border-none outline-none h-3"
          />
        </form>
        <button type="submit" className="p-1 bg-white rounded-full">
          <img src="/path-to-search-icon.svg" width={30} alt="Search" />
        </button>
      </header>
      <main className="flex flex-col bg-white items-end mt-5 mb-5 mr-4">
        <div className="flex space-x-4 mb-1">
          <button
            onClick={openLoginModal}
            className="relative inline-block px-4 py-2 font-semibold text-black bg-black border-2 border-black rounded shadow-md"
          >
            <span className="relative z-10">Login</span>
            <span className="absolute inset-0 bg-white transform -skew-x-3 skew-y-3 z-0"></span>
          </button>
          <button
            onClick={openSignUpModal}
            className="relative inline-block px-4 py-2 font-semibold text-white border-2 border-black rounded shadow-md"
          >
            <span className="relative z-10">Sign Up</span>
            <span className="absolute inset-0 bg-black transform -skew-x-3 skew-y-3 z-0"></span>
          </button>
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
          <div className="w-1/2 border-r-2 border-black">
            <p className="text-black font-semibold mt-2 break-all">Ready to get started?</p>
            <p className="text-black break-all max-w-[45ch]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="w-1/2 text-right mt-10">
            <p className="text-black">©️ 2010 — 2024 Privacy — Terms</p>
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
