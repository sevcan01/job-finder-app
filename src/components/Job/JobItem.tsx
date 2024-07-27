import React from 'react';
import { applyForJob } from '../../api';

interface JobItemProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
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

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p className="text-gray-700">{job.company}</p>
      <p className="text-gray-700">{job.location}</p>
      <p className="text-gray-600">{job.description}</p>
      <button 
        onClick={handleApply}
        className="mt-2 bg-blue-500 text-white py-1 px-4 rounded"
      >
        Apply
      </button>
    </div>
  );
};

export default JobItem;
