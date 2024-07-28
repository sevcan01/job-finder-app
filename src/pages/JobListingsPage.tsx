import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchJobListings, Job } from '../api/job';
import JobItem from '../components/Job/JobItem';
import Header from '../components/Header';
import { useForm, SubmitHandler } from 'react-hook-form';
interface SearchFormInputs {
  query: string;
}
const JobListingsPage: React.FC = () => {
  const { data, error, isLoading } = useQuery<Job[]>({
    queryKey: ['jobListings'],
    queryFn: fetchJobListings,
  });

  const { register, handleSubmit } = useForm<SearchFormInputs>();

  const onSubmit: SubmitHandler<SearchFormInputs> = (data) => {
    console.log(data.query);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error loading jobs: {error.message}</div>;

  const jobListings = data ?? [];

  if (jobListings.length === 0) return <div>No jobs found</div>;

  return (
    <>
      <Header onSubmit={handleSubmit(onSubmit)} register={register} />
      <div className="min-h-screen bg-gray-100">
        <div className=" mx-auto">
          <div className="flex">
            <div className="w-3/4">
              {jobListings.map((job) => (
                <JobItem key={job.id} job={job} />
              ))}
            </div>
            <div className="w-1/3 bg-white p-4">
              Right side
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobListingsPage;



