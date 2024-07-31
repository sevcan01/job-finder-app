import React, { useState } from 'react';
import CustomButton from '../CustomButton';
import { Job } from '../../api/job';
import DetailModal from './JobDetailModal';
import { useTranslation } from 'react-i18next';

interface JobItemProps {
  job: Job;
  handleApply: (job: Job, onRequestClose: () => void) => void;
  handleWithdraw: (jobId: string) => void;
  isApplied: boolean;
}

const JobItem: React.FC<JobItemProps> = ({ job, handleApply, handleWithdraw, isApplied }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-3 border-2 border-black flex flex-col md:flex-row items-start">
      <div className="mr-4  md:mb-0">
        <img src="/work-svgrepo-com.svg" alt="work" width={25} />
      </div>
      <div className="flex-grow min-w-0 mb-1 md:mb-0">
        <h2 className="text-xl font-bold">{job.companyName} - {job.name}</h2>
        <p className="text-black max-w-[40ch]">{job.description}</p>
        <p>{t('location')}: {job.location}</p>
        <p>{t('salary')}: {job.salary}$</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {job.keywords.slice(0, 3).map((keyword, index) => (
            <button key={index} className="border p-1">{keyword}</button>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-2 self-stretch">
        <CustomButton label={t('detail')} onClick={handleOpenModal} width='100px' />
        {isApplied && <CustomButton label={t('withdraw')} onClick={() => handleWithdraw(job.id)} textColor="black" buttonColor="white" width='100px' />}
      </div>

      <DetailModal isOpen={isModalOpen} onRequestClose={handleCloseModal} job={job} handleApply={handleApply} />
    </div>
  );
};

export default JobItem;
