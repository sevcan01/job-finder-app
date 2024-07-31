import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchJobListings, Job, applyForJob as apiApplyForJob, withdrawApplication as apiWithdrawApplication } from '../api/job';
import JobListings from '../components/Job/JobListings';
import Pagination from '../components/Job/Pagination';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthStore, useJobStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import FilterForm from '../components/FilterForm';
import AppliedJobs from '../components/Job/AppliedJobs';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';

interface SearchFormInputs {
  query: string;
  filterField: string;
}

const JobListingsPage: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const jobsPerPage = 3;

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
    navigate('/');
  };

  const handleApply = async (job: Job, onRequestClose: () => void) => {
    if (appliedJobs.some(appliedJob => appliedJob.id === job.id)) {
      throw new Error('already_applied');
    }
    try {
      await apiApplyForJob(job.id); 
      applyForJob(job); 
      onRequestClose(); 
    } catch (error) {
      console.error('Failed to apply for job:', error);
      if (error instanceof Error) {
        if (error.message === 'already_applied') {

        } else {

        }
      } else {

      }
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

  if (isLoading) return <div>{t('loading')}</div>;
  if (error instanceof Error) return <div>{t('error_loading_jobs', { error: error.message })}</div>;

  const jobListings = data?.filter((job) => {
    if (!searchQuery) return true;
    if (job.name.toLowerCase().includes(searchQuery.toLowerCase())) return true;
    if (job.companyName.toLowerCase().includes(searchQuery.toLowerCase())) return true;
    if (job.location.toLowerCase().includes(searchQuery.toLowerCase())) return true;
    return false;
  }) ?? [];

  const totalPages = Math.ceil(jobListings.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = jobListings.slice(startIndex, startIndex + jobsPerPage);

  return (
    <>
      <div className='fixed w-full'>
        <Header />
      </div>

      <div className="pt-20 flex">
        <div className="w-full flex flex-col">
          <main className="flex flex-col border-2 border-black">
            <div className="flex justify-between p-5 items-center">
              <p className='font-bold'>ACME</p>
              <div className="flex items-center gap-4">
                <a className="underline text-blue-600" href="#">{t('job_list')}</a>
                <a className="underline" href="#" onClick={handleLogout}>{t('logout')}</a>
                <div className="flex items-center gap-2">
                  <p>{email}</p>
                  {profileImage ? (
                    <img src={profileImage} alt={t('profile')} className="w-6 h-6 rounded-full border-2 border-black" />
                  ) : (
                    <div className='w-7 h-7 border-2 border-black rounded-full mb-2' />
                  )}
                </div>
              </div>
            </div>
          </main>
          <FilterForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} />
          <div className='flex flex-col flex-grow max-h-[550px] overflow-y-scroll'>
            {currentJobs.length > 0 ? (
              <JobListings jobs={currentJobs} handleApply={handleApply} handleWithdraw={handleWithdraw} appliedJobs={appliedJobs} />
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-xl font-bold">{t('no_jobs_found')}</p>
              </div>
            )}
          </div>
          <div className="mt-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
        <div className="hidden md:block md:w-2/5 h-screen">
          <div className="h-full overflow-y-auto mt-8">
            <AppliedJobs appliedJobs={appliedJobs} handleWithdraw={handleWithdraw} profileImage={profileImage} email={email} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full z-10">
        <div className="w-full h-7 bg-[#9d9a9a] border-black border-t-4" />
      </div>
    </>
  );
};

export default JobListingsPage;
