import React, { useState } from 'react';
import CustomButton from '../CustomButton';
import { Job } from '../../api/job';
import DetailModal from './JobDetailModal';


interface JobItemProps {
  job: Job;
  handleApply: (job: Job) => void;
  handleWithdraw: (jobId: string) => void;
  isApplied: boolean;
}

const JobItem: React.FC<JobItemProps> = ({ job, handleApply, handleWithdraw,isApplied }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-3 border-2 border-black flex items-start">
      <div className="mr-4">
        <img src="/work-svgrepo-com.svg" alt="work" width={25} />
      </div>
      <div className="flex-grow min-w-0">
        <h2 className="text-xl font-bold">{job.companyName} - {job.name}</h2>
        <p className="text-black max-w-[40ch]">{job.description}</p>
        <p>Location: {job.location}</p>
        <p>Salary: {job.salary}$</p>
        <div className="flex gap-2 mt-2">
          <button className="border p-1">ipsum</button>
          <button className="border p-1">dolar</button>
          <button className="border p-1">sit</button>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <CustomButton label="Detail" onClick={handleOpenModal} />
        {!isApplied && <CustomButton label="Apply" onClick={() => handleApply(job)} />}
        {isApplied && <CustomButton label="Withdraw" onClick={() => handleWithdraw(job.id)} textColor="black" buttonColor="white" />}
      </div>

      <DetailModal isOpen={isModalOpen} onRequestClose={handleCloseModal} job={job} handleApply={handleApply} handleWithdraw={handleWithdraw} />
    </div>
  );
};

export default JobItem;
