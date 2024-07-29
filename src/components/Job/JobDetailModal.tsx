// import React from 'react';
// import Modal from 'react-modal';
// import CustomButton from '../CustomButton';
// import { Job } from '../../api/job';

// interface DetailModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   job: Job
//   handleWithdraw: (jobId: string) => void;
//   handleApply: (job: Job) => void;
// }


// const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onRequestClose, job,handleApply  }) => {
//   const formattedDate = new Date(job.createdAt).toLocaleDateString();
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       contentLabel="Job Detail Modal"
//       className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
//       overlayClassName="fixed bg-gray-800 bg-opacity-50 z-40"
//     >
//       <div className="bg-white p-8 rounded shadow-md max-w-sm w-full relative border-2 border-black">
//         <button onClick={onRequestClose} className="absolute top-4 right-4 text-black text-2xl font-bold">
//           <img src="/path-to-close-icon.svg" width={25} alt="Close" />
//         </button>
//         <h2 className="text-2xl font-bold mb-6 text-center">Apply Job</h2>
//         <div className="space-y-1">
//           <p><strong>Company:</strong> {job.companyName}</p>
//           <p><strong>Job Name:</strong> {job.name}</p>
//           <p><strong>Creaded At:</strong> {formattedDate}</p>
//           <p><strong>Location:</strong> {job.location}</p>
         
//           <div className='flex'>

//           <span><strong>Keyword:</strong></span>
//           </div>
//           <div className='flex gap-1'>
//           {job.keywords.slice(0, 3).map((keyword, index) => (
//             <button key={index} className="border p-1">{keyword}</button>
//           ))}
//         </div>
//           <p><strong>Salary:</strong> {job.salary}</p>
//           <h1><strong> Job Description</strong></h1>
//           <div className='p-3 border border-black'>
// <p>{job.description}</p>
//           </div>
//           <div className='flex gap-5 justify-center p-2'>
//             <CustomButton label='Close' onClick={onRequestClose} buttonColor='white' textColor='black' width='25%'/>
//             <CustomButton label="Apply"  onClick={() => handleApply(job)} textColor="white" buttonColor="black" width='25%'/>

//           </div>

//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default DetailModal;
import React from 'react';
import Modal from 'react-modal';
import CustomButton from '../CustomButton';
import { Job } from '../../api/job';

interface DetailModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  job: Job;
  handleApply: (job: Job, onRequestClose: () => void) => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onRequestClose, job, handleApply }) => {
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
          <p><strong>Created At:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <div className='flex'>
            <span><strong>Keyword:</strong></span>
          </div>
          <div className='flex gap-4'>
            {job.keywords.slice(0, 3).map((keyword, index) => (
              <button key={index} className="border p-1">{keyword}</button>
            ))}
          </div>
          <p><strong>Salary:</strong> {job.salary}</p>
          <h1><strong> Job Description</strong></h1>
          <div className='p-3 border border-black'>
            <p>{job.description}</p>
          </div>
          <div className='flex gap-5 justify-center p-2'>
            <CustomButton label='Close' onClick={onRequestClose} buttonColor='white' textColor='black' width='25%'/>
            <CustomButton label="Apply" onClick={() => handleApply(job, onRequestClose)} buttonColor='black' textColor='white' width='25%'/>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailModal;
