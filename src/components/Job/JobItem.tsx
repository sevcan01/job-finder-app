import React from 'react';

interface JobItemProps {
  job: {
    id: string;
    title: string;
    description: string;
  };
}

const JobItem: React.FC<JobItemProps> = ({ job }) => (
  <div className="bg-white p-4 rounded shadow-md">
    <h2 className="text-xl font-semibold">{job.title}</h2>
    <p className="text-gray-600">{job.description}</p>
    <div className="mt-4">
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2">
        Detail
      </button>
      <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
        Withdraw
      </button>
    </div>
  </div>
);

export default JobItem;
