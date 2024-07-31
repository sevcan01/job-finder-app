import React from 'react';
import JobItem from './JobItem';

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
  return (
    <div className="relative flex flex-col justify-between overflow-y-scroll">
      {jobs.map((job) => {
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
  );
};

export default JobListings;
