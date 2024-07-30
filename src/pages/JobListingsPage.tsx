import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchJobListings, Job, applyForJob as apiApplyForJob, withdrawApplication as apiWithdrawApplication } from '../api/job';
import JobListings from '../components/Job/JobListings';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthStore, useJobStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import FilterForm from '../components/FilterForm';
import AppliedJobs from '../components/Job/AppliedJobs';

interface SearchFormInputs {
  query: string;
  filterField: string;
}

const JobListingsPage: React.FC = () => {
  const { data, error, isLoading } = useQuery<Job[]>({
    queryKey: ['jobListings'],
    queryFn: fetchJobListings,
  });

  const { register, handleSubmit, watch } = useForm<SearchFormInputs>();
  const { appliedJobs, applyForJob, withdrawJob, searchQuery, setSearchQuery } = useJobStore();
  const { email, profileImage, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const watchedQuery = watch('query');

  useEffect(() => {
    if (watchedQuery !== undefined) {
      setSearchQuery(watchedQuery);
    }
  }, [watchedQuery, setSearchQuery]);

  const onSubmit: SubmitHandler<SearchFormInputs> = (data) => {
    setSearchQuery(data.query);
  };

  const handleLogout = () => {
    clearAuth();
    navigate('/'); // Kullanıcıyı ana sayfaya yönlendir
  };

  const handleApply = async (job: Job, onRequestClose: () => void) => {
    if (appliedJobs.some(appliedJob => appliedJob.id === job.id)) {
      alert('You have already applied for this job.');
      return;
    }
    try {
      await apiApplyForJob(job.id);
      applyForJob(job);
      onRequestClose();
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

  const jobListings = data?.filter((job) =>
    job.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? [];

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex flex-grow">
        <div className="w-full md:w-4/5 h-full">
          <main className="flex flex-col border-2 border-black">
            <div className="flex justify-between p-4 items-center">
              <p className=' font-bold'>ACME</p>
              <div className="flex items-center gap-4">
                <a className="underline text-blue-600" href="#">Job List</a>
                <a className="underline" href="#" onClick={handleLogout}>Logout</a>
                <div className="flex items-center gap-2">
                  <p>{email}</p>
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-6 h-6 rounded-full border-2 border-black" />
                  ) : (
                    <div className='w-7 h-7 border-2 border-black rounded-full mb-2' />
                  )}
                </div>
              </div>
            </div>
          </main>
          <FilterForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} />
          <div className='flex flex-col h-[calc(100vh-150px)] overflow-y-scroll'>
            {jobListings.length > 0 ? (
              <JobListings jobs={jobListings} handleApply={handleApply} handleWithdraw={handleWithdraw} appliedJobs={appliedJobs} />
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-xl font-bold">No jobs found</p>
              </div>
            )}
          </div>
        </div>
        <div className="hidden md:block md:w-2/5 h-screen">
          <div className="h-full overflow-y-auto">
            <AppliedJobs appliedJobs={appliedJobs} handleWithdraw={handleWithdraw} profileImage={profileImage} email={email} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full z-10">
        <div className="w-full h-7 bg-[#9d9a9a] border-black border-t-4" />
      </div>
    </div>
  );
};

export default JobListingsPage;
