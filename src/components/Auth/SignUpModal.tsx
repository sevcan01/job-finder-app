import React from 'react';
import Modal from 'react-modal';
import CustomButton from '../CustomButton';

interface LoginModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onRequestClose }) => {
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
        <h2 className="text-2xl font-bold mb-6 text-center">SIGN UP</h2>
        <form className="space-y-4">
     
          <label className="block">
            <span className="text-gray-700">Email</span>
            <input type="email" className="border border-black p-2 w-full mt-1" placeholder="hr@shft.co" />
          </label>
          <label className="block">
            <span className="text-gray-700">Password</span>
            <input type="password" className="border border-black p-2 w-full mt-1" placeholder="******" />
          </label>
          <div className="flex justify-center py-4">
          <CustomButton onClick={()=>{}} buttonColor="white" textColor="black" label="Sign Up" width="200px" height='50'/>
          </div>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account?  </span>
          <a href="#" className="text-blue-600">Login</a>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
