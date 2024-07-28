// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { fetchJobListings, Job } from '../api/job';
// import JobItem from '../components/Job/JobItem';
// import Header from '../components/Header';
// import { useForm, SubmitHandler } from 'react-hook-form';
// interface SearchFormInputs {
//   query: string;
// }
// const JobListingsPage: React.FC = () => {
//   const { data, error, isLoading } = useQuery<Job[]>({
//     queryKey: ['jobListings'],
//     queryFn: fetchJobListings,
//   });

//   const { register, handleSubmit } = useForm<SearchFormInputs>();

//   const onSubmit: SubmitHandler<SearchFormInputs> = (data) => {
//     console.log(data.query);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error instanceof Error) return <div>Error loading jobs: {error.message}</div>;

//   const jobListings = data ?? [];

//   if (jobListings.length === 0) return <div>No jobs found</div>;

//   return (
//     <>
//     <Header onSubmit={handleSubmit(onSubmit)} register={register} />
   
//     <div className="min-h-screen flex">
//       {/* Sol taraf */}
//       <div className="w-3/5 h-full overflow-y-auto">
//         <main className="flex flex-col bg-white border-2 border-black">
//           <div className="flex justify-between p-3 items-center ml-3">
//             <p>ACME</p>
//             <div className="flex justify-around gap-7">
//               <div className="flex space-x-4 items-center">
//                 <a className="underline text-blue-600" href="#">Job List</a>
//                 <a href="#">Logout</a>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <p>hr@shift.co</p>
//                 <div className="w-8 h-8 border-2 border-black rounded-full"/>
//               </div>
//             </div>
//           </div>
//         </main>
//         <div className="p-2 bg-gray-200 border-2 border-black">
//           <div className="flex items-center space-x-4">
//             <span className="ml-3 font-bold">Basic Filter</span>
//             <select className="border-2 border-black p-2 rounded">
//               <option>Select a Field</option>
//               <option>Option 1</option>
//               <option>Option 2</option>
//               <option>Option 3</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Search"
//               className="border-2 border-black p-1 rounded"
//             />
//           </div>
//         </div>
//         {jobListings.map((job) => (
//           <JobItem key={job.id} job={job} />
//         ))}
//       </div>
      
//       {/* Sağ taraf */}
//       <div className="w-2/5 h-full overflow-y-auto bg-white p-4">
//         Right side
//       </div>
//     </div>
//   </>
//   );
// };

// export default JobListingsPage;



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
    <div className=''>
      <Header onSubmit={handleSubmit(onSubmit)} register={register} />
     
      <div className="flex h-screen">
        {/* Sol taraf */}
        <div className="w-3/5">
          <main className="flex flex-col bg-white border-2 border-black">
            <div className="flex justify-between p-3 items-center ml-3">
              <p>ACME</p>
              <div className="flex justify-around gap-7">
                <div className="flex space-x-4 items-center">
                  <a className="underline text-blue-600" href="#">Job List</a>
                  <a href="#">Logout</a>
                </div>
                <div className="flex items-center space-x-4">
                  <p>hr@shift.co</p>
                  <div className="w-8 h-8 border-2 border-black rounded-full"/>
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
          
          <JobListings jobs={jobListings} />

        </div>
        
        {/* Sağ taraf */}
        <div className="w-2/5 h-full overflow-y-auto bg-white p-4">
          Right side
        </div>
      </div>
      <div>
        <h1></h1>
      </div>
      <div className="w-full h-7 bg-[#9d9a9a] border-black border-t-2" />
    </div>
  );
};

export default JobListingsPage;
