import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchJobListings } from '../api';
import JobItem from '../components/Job/JobItem';

const JobListingsPage: React.FC = () => {
  const { data, error, isLoading } = useQuery(['jobListings'], fetchJobListings);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading jobs</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white w-full shadow p-4 mb-4">
        <h1 className="text-2xl font-bold text-center">Job Listings</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobListingsPage;
