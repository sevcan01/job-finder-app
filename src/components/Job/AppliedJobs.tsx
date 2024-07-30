import React from 'react';
import { Job } from '../../api/job';
import { Scrollbars } from 'react-custom-scrollbars';

interface AppliedJobsProps {
  appliedJobs: Job[];
  handleWithdraw: (jobId: string) => void;
  profileImage: string;
  email: string;
}

const AppliedJobs: React.FC<AppliedJobsProps> = ({ appliedJobs, profileImage, email }) => {
  return (
    <div className="flex flex-col items-center mt-10 h-full p-3">
      {profileImage ? (
        <img src={profileImage} alt="Profile" className="w-14 h-14 rounded-full border-2 border-black" />
      ) : (
        <div className='w-14 h-14 border-2 border-black rounded-full mb-2 mt-2 flex-shrink-0' />
      )}
      <p>{email}</p>
      <h2 className="text-xl text-center font-bold mb-4 mt-3">Applied Jobs</h2>
      <div className="w-full h-full">
        <Scrollbars autoHide>
          {appliedJobs.map(job => (
            <div key={job.id} className="bg-gray-100 p-4 mb-4 border-2 border-black">

              <p><strong>Company Name :</strong> {job.name}</p>
              <p><strong>Location: </strong> {job.location}</p>
            </div>
          ))}
        </Scrollbars>
      </div>
    </div>
  );
};

export default AppliedJobs;
