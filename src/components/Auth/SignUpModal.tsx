import React, { FormEvent } from 'react';
import Modal from 'react-modal';
import CustomButton from '../CustomButton';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

interface SignUpModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  openLoginModal: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onRequestClose, openLoginModal }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;

    try {
      const data = await register(email, password);
      console.log(data);
      toast.dark(t('registration_success'), { autoClose: 1000 });
      navigate('/'); 
      onRequestClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Registration failed:', error.response?.data || error.message);
        toast.error(t('registration_failed', { message: error.response?.data?.message || error.message }), { autoClose: 1000 });
      } else if (error instanceof Error) {
        console.error('Registration failed:', error.message);
        toast.error(t('registration_failed', { message: error.message }), { autoClose: 1000 });
      } else {
        console.error('Registration failed:', error);
        toast.error(t('registration_failed', { message: String(error) }), { autoClose: 1000 });
      }
    }
  };

  const handleOpenLoginModal = () => {
    onRequestClose(); // Close the SignUpModal first
    openLoginModal(); // Then open the LoginModal
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Sign Up Modal"
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
      ariaHideApp={false}
    >
      <div className="bg-white p-8 rounded shadow-md max-w-sm w-full relative">
        <button onClick={onRequestClose} className="absolute top-4 right-4 text-black text-2xl font-bold">
          <img src="/path-to-close-icon.svg" width={25} alt="Close" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">{t('signup')}</h2>
        <form className="space-y-4" onSubmit={handleRegisterSubmit}>
          <label className="block">
            <span className="text-gray-700">Email</span>
            <input name="email" type="email" className="border border-black p-2 w-full mt-1" placeholder="hr@shft.co" />
          </label>
          <label className="block">
            <span className="text-gray-700">Password</span>
            <input name="password" type="password" className="border border-black p-2 w-full mt-1" placeholder="******" />
          </label>
          <div className="flex justify-center py-4">
            <CustomButton onClick={() => {}} buttonColor="white" textColor="black" label={t('signup')} width="200px"  />
          </div>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">{t('already_have_account')} </span>
          <a href="#" className="text-blue-600" onClick={handleOpenLoginModal}>{t('login')}</a>
        </div>
      </div>
    </Modal>
  );
};

export default SignUpModal;
