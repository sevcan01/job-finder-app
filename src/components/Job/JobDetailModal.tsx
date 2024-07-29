import React from 'react';
import Modal from 'react-modal';
import CustomButton from '../CustomButton';
import { Job } from '../../api/job';

interface DetailModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  job: Job
  handleWithdraw: (jobId: string) => void;
  handleApply: (job: Job) => void;
}


const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onRequestClose, job,handleApply  }) => {
    
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Job Detail Modal"
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"
    >
      <div className="bg-white p-8 rounded shadow-md max-w-sm w-full relative">
        <button onClick={onRequestClose} className="absolute top-4 right-4 text-black text-2xl font-bold">
          <img src="/path-to-close-icon.svg" width={25} alt="Close" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Apply Job</h2>
        <div className="space-y-1">
          <p><strong>Company:</strong> {job.companyName}</p>
          <p><strong>Job Name:</strong> {job.name}</p>
          <p><strong>Creaded At:</strong> {job.createdAt}</p>
          <p><strong>Location:</strong> {job.location}</p>
         
          <div className='flex'>

          <span><strong>Keyword:</strong></span>
          </div>
          <div className='flex gap-4'>

          <button className="border p-1">ipsum</button>
          <button className="border p-1">dolar</button>
          <button className="border p-1">sit</button>
          </div>
          <p><strong>Salary:</strong> {job.salary}</p>
          <h1><strong> Job Description</strong></h1>
          <div className='p-3 border border-black'>
            <p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
          </div>
          <div className='flex gap-5 justify-center p-2'>
            <CustomButton label='Close' onClick={onRequestClose} buttonColor='white' textColor='black'/>
            <CustomButton label="Apply"  onClick={() => handleApply(job)} textColor="black" buttonColor="white" />

          </div>

        </div>
      </div>
    </Modal>
  );
};

export default DetailModal;
