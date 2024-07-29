import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchJobListings, Job } from '../api/job';
import JobListings from '../components/Job/JobListings';
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
    <div className="relative min-h-screen flex flex-col">
      <Header onSubmit={handleSubmit(onSubmit)} register={register} />

      <div className="flex flex-grow">
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
<div className=''>

          <JobListings jobs={jobListings} />
</div>
        </div>

        <div className="w-1/5 h-full overflow-y-auto bg-white p-4 border-l-2 border-black">
          <h2 className="text-xl font-bold mb-4">Applied Jobs</h2>
          {/* Applied Jobs Section */}
          <div className="bg-gray-100 p-4  mb-4 border-2 border-black">
            <h3 className="font-bold text-center">Job Name</h3>
            <p>Company Name: Ipsum Dolor</p>
            <p>Location: Irving</p>
          </div>
       
       
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-10">
        <div className="w-full h-7 bg-[#9d9a9a] border-black border-t-2" />
      </div>
    </div>
  );
};

export default JobListingsPage;
