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
     
      <div className="min-h-screen ">
      
          <div className="flex  ">
            <div className=" ">
            <main className="flex flex-col bg-white  mt-5 mb-5 mr-4">
        <div className="flex text-2xl p-4 bg-red-500">
          ACME
        </div>
      </main>
      <div className="p-4 bg-gray-200 border rounded">
      <div className="flex items-center space-x-4">
        <span className="font-bold">Basic Filter</span>
        <select className="border p-2 rounded">
          <option>Select a Field</option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
        <input
          type="text"
          placeholder="Search"
          className="border p-1 rounded "
        />
      </div>
    </div>
              {jobListings.map((job) => (
                <JobItem key={job.id} job={job} />
              ))}
            </div>
            <div className="w-1/3 bg-white p-4">
              Right side
            </div>
          </div>

      </div>
    </>
  );
};

export default JobListingsPage;



