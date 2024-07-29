import React, { FormEvent } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../CustomButton';
import { login } from '../../api';

interface LoginModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onRequestClose }) => {
  const navigate = useNavigate();

  const handleLoginSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // @ts-ignore
    const email =  e.target[0].value;
     //@ts-ignore
    const pass =  e.target[1].value;

     const data = await login(email,pass)
     console.log(data);
  

    navigate('/job-listing'); // job-listing sayfasına yönlendirme
    onRequestClose(); // Modal'ı kapatma
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login Modal"
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
    >
      <div className="bg-white p-8 rounded shadow-md max-w-sm w-full relative">
        <button onClick={onRequestClose} className="absolute top-4 right-4 text-black text-2xl font-bold">
          <img src="/path-to-close-icon.svg" width={25} alt="Close" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">LOGIN</h2>
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Email</span>
            <input name='email' type="email" className="border border-black p-2 w-full mt-1" placeholder="hr@shft.co" />
          </label>
          <label className="block">
            <span className="text-gray-700">Password</span>
            <input name='pass' type="password" className="border border-black p-2 w-full mt-1" placeholder="******" />
          </label>
          <div className="flex justify-center py-4">
          <CustomButton onClick={()=>{}} buttonColor="white" textColor="black" label="Login" width="200px" height='50'/>
          </div>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">Don’t have an account? </span>
          <a href="#" className="text-blue-600">Login</a>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
