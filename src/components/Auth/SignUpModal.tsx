import React, { FormEvent } from 'react';
import Modal from 'react-modal';
import CustomButton from '../CustomButton';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api';
import axios from 'axios';

interface SignUpModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onRequestClose }) => {
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;

    try {
      const data = await register(email, password);
      console.log(data);

      navigate('/'); // job-listing sayfasına yönlendirme
      onRequestClose(); // Modal'ı kapatma
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Registration failed:', error.response?.data || error.message);
        alert('Registration failed: ' + (error.response?.data?.message || error.message));
      } else if (error instanceof Error) {
        console.error('Registration failed:', error.message);
        alert('Registration failed: ' + error.message);
      } else {
        console.error('Registration failed:', error);
        alert('Registration failed: ' + String(error));
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Sign Up Modal"
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
    >
      <div className="bg-white p-8 rounded shadow-md max-w-sm w-full relative">
        <button onClick={onRequestClose} className="absolute top-4 right-4 text-black text-2xl font-bold">
          <img src="/path-to-close-icon.svg" width={25} alt="Close" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">SIGN UP</h2>
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
            <CustomButton onClick={() => {}} buttonColor="white" textColor="black" label="Sign Up" width="200px" height="50px" />
          </div>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <a href="#" className="text-blue-600">Login</a>
        </div>
      </div>
    </Modal>
  );
};

export default SignUpModal;
