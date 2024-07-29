import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchJobListings, Job, applyForJob as apiApplyForJob, withdrawApplication as apiWithdrawApplication } from '../api/job';
import JobListings from '../components/Job/JobListings';
import Header from '../components/Header';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useJobStore } from '../stores/authStore';


interface SearchFormInputs {
  query: string;
}

const JobListingsPage: React.FC = () => {
  const { data, error, isLoading } = useQuery<Job[]>({
    queryKey: ['jobListings'],
    queryFn: fetchJobListings,
  });

  const { register, handleSubmit } = useForm<SearchFormInputs>();
  const { appliedJobs, applyForJob, withdrawJob } = useJobStore();

  const onSubmit: SubmitHandler<SearchFormInputs> = (data) => {
    console.log(data.query);
  };

  const handleApply = async (job: Job) => {
    try {
      await apiApplyForJob(job.id);
      applyForJob(job);
    } catch (error) {
      console.error('Failed to apply for job:', error);
    }
  };

  const handleWithdraw = async (jobId: string) => {
    try {
      await apiWithdrawApplication(jobId);
      withdrawJob(jobId);
    } catch (error) {
      console.error('Failed to withdraw application:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error loading jobs: {error.message}</div>;

  const jobListings = data ?? [];

  if (jobListings.length === 0) return <div>No jobs found</div>;

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header onSubmit={handleSubmit(onSubmit)} register={register} />

      <div className="flex flex-grow">
        {/* Sağ taraf */}
        <div className="w-3/5 h-full overflow-y-auto">
          <main className="flex flex-col bg-white border-2 border-black">
            <div className="flex justify-between p-3 items-center">
              <p>ACME</p>
              <div className="flex items-center gap-4">
                <a className="underline text-blue-600" href="#">Job List</a>
                <a href="#">Logout</a>
                <div className="flex items-center gap-2">
                  <p>hr@shift.co</p>
                  <div className="w-8 h-8 border-2 border-black rounded-full" />
                </div>
              </div>
            </div>
          </main>
          <div className="p-2 bg-gray-200 border-2 border-black">
            <div className="flex items-center space-x-4">
              <span className="ml-3 font-bold">Basic Filter</span>
              <select className="border-2 border-black p-2 rounded">
                <option>Select a Field</option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
              <input
                type="text"
                placeholder="Search"
                className="border-2 border-black p-1 rounded"
              />
            </div>
          </div>
          <JobListings jobs={jobListings} handleApply={handleApply} handleWithdraw={handleWithdraw} appliedJobs={appliedJobs} />
        </div>
        {/* Sol taraf */}
        <div className="w-1/5 h-full overflow-y-auto bg-white p-4 border-l-2 border-black">
          <h2 className="text-xl font-bold mb-4">Applied Jobs</h2>
          {appliedJobs.map(job => (
            <div key={job.id} className="bg-gray-100 p-4 mb-4 border-2 border-black">
              <h3 className="font-bold text-center">{job.name}</h3>
              <p>Company Name: {job.companyName}</p>
              <p>Location: {job.location}</p>
              <button className="border p-1 mt-2" onClick={() => handleWithdraw(job.id)}>Withdraw</button>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-10">
        <div className="w-full h-7 bg-[#9d9a9a] border-black border-t-2" />
      </div>
    </div>
  );
};

export default JobListingsPage;
