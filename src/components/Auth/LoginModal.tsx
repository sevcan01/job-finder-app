import React, { FormEvent } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../CustomButton';
import { login } from '../../api';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface LoginModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  openSignUpModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onRequestClose, openSignUpModal }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = (e.target as HTMLFormElement).elements.namedItem('email') as HTMLInputElement;
    const password = (e.target as HTMLFormElement).elements.namedItem('password') as HTMLInputElement;

    try {
      const data = await login(email.value, password.value);
      console.log(data);
      toast.dark(t('login_success'), { autoClose: 1000 });
      navigate('/job-listing');
      onRequestClose();
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(t('login_failed', { message: (error as Error).message }), { autoClose: 1000 });
    }
  };

  const handleOpenSignUpModal = () => {
    onRequestClose(); 
    openSignUpModal(); 
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login Modal"
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
      ariaHideApp={false}
    >
      <div className="bg-white p-8 rounded shadow-md max-w-sm w-full relative">
        <button onClick={onRequestClose} className="absolute top-4 right-4 text-black text-2xl font-bold">
          <img src="/path-to-close-icon.svg" width={25} alt="Close" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">{t('login')}</h2>
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">{t('Email')}</span>
            <input name='email' type="email" className="border border-black p-2 w-full mt-1" placeholder="hr@shft.co" />
          </label>
          <label className="block">
            <span className="text-gray-700">{t('Password')}</span>
            <input name='password' type="password" className="border border-black p-2 w-full mt-1" placeholder="******" />
          </label>
          <div className="flex justify-center py-4">
            <CustomButton onClick={() => { }} buttonColor="white" textColor="black" label={t('login')} width="200px" />
          </div>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">{t('dont_have_account')} </span>
          <a href="#" className="text-blue-600" onClick={handleOpenSignUpModal}>{t('signup')}</a>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
