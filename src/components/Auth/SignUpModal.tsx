import React from 'react';
import Modal from 'react-modal';

interface SignUpModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Sign Up Modal"
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
    >
      <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form>
          <label className="block mb-2">
            Name
            <input type="text" className="border border-gray-300 p-2 w-full" />
          </label>
          <label className="block mb-2">
            Email
            <input type="email" className="border border-gray-300 p-2 w-full" />
          </label>
          <label className="block mb-4">
            Password
            <input type="password" className="border border-gray-300 p-2 w-full" />
          </label>
          <button type="submit" className="bg-black text-white px-4 py-2 rounded">Sign Up</button>
        </form>
        <button onClick={onRequestClose} className="mt-4 text-red-500">Close</button>
      </div>
    </Modal>
  );
};

export default SignUpModal;
