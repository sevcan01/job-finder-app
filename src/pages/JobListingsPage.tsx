import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchJobListings, Job, applyForJob as apiApplyForJob, withdrawApplication as apiWithdrawApplication } from '../api/job';
import JobListings from '../components/Job/JobListings';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthStore, useJobStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

interface SearchFormInputs {
  query: string;
  filterField: string;
}

const JobListingsPage: React.FC = () => {
  const { data, error, isLoading } = useQuery<Job[]>({
    queryKey: ['jobListings'],
    queryFn: fetchJobListings,
  });

  const { register, handleSubmit } = useForm<SearchFormInputs>();
  const { appliedJobs, applyForJob, withdrawJob, searchQuery, setSearchQuery } = useJobStore();
  const { email, profileImage, clearAuth } = useAuthStore();
  const navigate = useNavigate();

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
      onRequestClose(); // İşleme başarılı olduktan sonra modalı kapat
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

  if (jobListings.length === 0) return <div>No jobs found</div>;

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="flex flex-grow overflow-hidden">
        <div className="w-full md:w-4/5 h-full overflow-y-auto border-r-2 border-black">
          <main className="flex flex-col bg-white border-b-2 border-black">
            <div className="flex justify-between p-5 items-center border-b-2 border-black">
              <p>ACME</p>
              <div className="flex items-center gap-4">
                <a className="underline text-blue-600" href="#">Job List</a>
                <a href="#" onClick={handleLogout}>Logout</a>
                <div className="flex items-center gap-2">
                  <p>{email}</p>
                  {profileImage && <img src={profileImage} alt="Profile" className="w-8 h-8 rounded-full border-2 border-black" />}
                </div>
              </div>
            </div>
          </main>
          <div className="p-2 bg-gray-200 border-b-4 border-black">
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-4">
              <span className="ml-3 font-bold">Basic Filter</span>
              <select className="border-2 border-black p-2 rounded" {...register('filterField')}>
                <option value="">Select a Field</option>
                <option value="name">Job Name</option>
                <option value="companyName">Company Name</option>
                <option value="location">Location</option>
              </select>
              <input
                type="text"
                placeholder="Search"
                className="border-2 border-black p-1 rounded"
                {...register('query')}
              />
              <button type="submit" className="p-1 bg-white rounded-full">
                <img src="/path-to-search-icon.svg" width={30} alt="Search" />
              </button>
            </form>
          </div>
          <JobListings jobs={jobListings} handleApply={handleApply} handleWithdraw={handleWithdraw} appliedJobs={appliedJobs} />
        </div>
        <div className="hidden md:block md:w-2/5 overflow-y-auto bg-white p-4 border-l-4 border-black">
          <div className="flex flex-col items-center mt-10">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-16 h-16 rounded-full border-2 border-black mb-2" />
            ) : (
              <div className='w-16 h-16 border-2 border-black rounded-full mb-2' />
            )}
            <p>{email}</p>
          </div>
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
      </div>
      <div className="fixed bottom-0 left-0 w-full z-10">
        <div className="w-full h-7 bg-[#9d9a9a] border-black border-t-4" />
      </div>
    </div>
  );
};

export default JobListingsPage;
