import React from 'react';
import { applyForJob, withdrawApplication } from '../../api/job'; // API fonksiyonlarını içe aktarın

interface JobItemProps {
  job: {
    id: string;
    name: string;
    companyName: string;
    location: string;
    description: string;
    salary: number;
  };
}

const JobItem: React.FC<JobItemProps> = ({ job }) => {
  const handleApply = async () => {
    try {
      await applyForJob(job.id);
      alert('Application submitted successfully!');
    } catch (error) {
      alert('Failed to apply for job.');
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdrawApplication(job.id);
      alert('Application withdrawn successfully!');
    } catch (error) {
      alert('Failed to withdraw application.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold">{job.companyName} - {job.name}</h2>
      <p className="text-gray-600">{job.description}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}$</p>
      <div className="flex space-x-4 mt-4">
        <button 
          onClick={handleApply}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Apply
        </button>
        <button 
          onClick={handleWithdraw}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default JobItem;
