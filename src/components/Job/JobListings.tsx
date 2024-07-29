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
  keywords: string[];
  createdAt: string;
}

interface JobListingsProps {
  jobs: Job[];
  handleApply: (job: Job, onRequestClose: () => void) => void;
  handleWithdraw: (jobId: string) => void;
  appliedJobs: Job[];
}

const JobListings: React.FC<JobListingsProps> = ({ jobs, handleApply, handleWithdraw, appliedJobs }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedJobs = jobs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="relative pb-20 ">
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
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      <div className="fixed bottom-9 left-1/2  px-24 z-10 flex justify-start w-full">
      </div>
    </div>
  );
};

export default JobListings;
