// src/components/AppliedJobs.tsx
import React from 'react';
import { Job } from '../../api/job';


interface AppliedJobsProps {
  appliedJobs: Job[];
  handleWithdraw: (jobId: string) => void;
  profileImage: string;
  email: string;
}

const AppliedJobs: React.FC<AppliedJobsProps> = ({ appliedJobs,  profileImage, email }) => {
  return (
    <div className="flex flex-col items-center mt-10">
      {profileImage ? (
        <img src={profileImage} alt="Profile" className="w-16 h-16 rounded-full border-2 border-black mb-2" />
      ) : (
        <div className='w-16 h-16 border-2 border-black rounded-full mb-2' />
      )}
      <p>{email}</p>
      <h2 className="text-xl text-center font-bold mb-4">Applied Jobs</h2>
      <div className="w-full h-full overflow-y-auto">
        {appliedJobs.map(job => (
          <div key={job.id} className="bg-gray-100 p-4 mb-4 border-2 border-black">
            <h3 className="font-bold text-center">{job.name}</h3>
            <p><strong>Company Name :</strong> {job.name}</p>
            <p><strong>Location: </strong> {job.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
