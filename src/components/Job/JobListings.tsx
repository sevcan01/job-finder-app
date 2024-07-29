import React, { useState } from 'react';
import JobItem from './JobItem';
import Pagination from './Pagination';



interface Job {
  id: string;
  name: string;
  companyName: string;
  location: string;
  description: string;
  salary: number;

}

interface JobListingsProps {
  jobs: Job[];
  handleApply: (job: Job) => void;
  handleWithdraw: (jobId: string) => void;
  appliedJobs: Job[];
}



const JobListings: React.FC<JobListingsProps> = ({ jobs, handleApply, handleWithdraw,appliedJobs }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedJobs = jobs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="relative pb-20">
         <div>
        {selectedJobs.map((job) => {
          const isApplied = appliedJobs.some(appliedJob => appliedJob.id === job.id);
          return (
            <JobItem
              key={job.id}
              job={job}
              handleApply={handleApply}
              handleWithdraw={handleWithdraw}
              isApplied={isApplied} 
            />
          );
        })}
      </div>
      <div className="fixed bottom-3 bg-white px-28 py-6 z-10 flex justify-center">
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default JobListings;
