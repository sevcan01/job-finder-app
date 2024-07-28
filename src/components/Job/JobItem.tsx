import React from 'react';
import { applyForJob, withdrawApplication } from '../../api/job'; // API fonksiyonlarını içe aktarın
import CustomButton from '../CustomButton';

interface JobItemProps {
  job: {
    id: string;
    name: string;
    companyName: string;
    location: string;
    description: string;
    salary: number;
  };
}

const JobItem: React.FC<JobItemProps> = ({ job }) => {
  const handleApply = async () => {
    try {
      await applyForJob(job.id);
      alert('Application submitted successfully!');
    } catch (error) {
      alert('Failed to apply for job.');
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdrawApplication(job.id);
      alert('Application withdrawn successfully!');
    } catch (error) {
      alert('Failed to withdraw application.');
    }
  };

  return (
    <>
   
    <main className="flex flex-col bg-white items-end   mr-4">
    <div className="flex space-x-4 ">
    </div>
  </main>
    <div className="bg-white p-4 rounded border-2 border-black flex items-start">
    <div className="mr-4">
      <img src="/work-svgrepo-com.svg" alt="work" width={25} />
    </div>
    <div className="flex-grow">
      <h2 className="text-xl font-bold">{job.companyName} - {job.name}</h2>
      <p className="text-black max-w-[40ch]">{job.description}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}$</p>
      <div className="flex gap-2  mt-2">
        <button className="border  ">ipsum</button>
        <button className="border ">dolar</button>
        <button className="border  ">ipsum</button>
      </div>
    </div>
    <div className="flex flex-col space-y-2">
      <CustomButton label="Detail" onClick={() => {}} />
      <CustomButton label="Withdraw" onClick={handleWithdraw} textColor="black" buttonColor="white" />
    </div>
  </div>
  </>
  );
};

export default JobItem;



// import React from 'react';
// import { applyForJob, withdrawApplication } from '../../api/job'; // API fonksiyonlarını içe aktarın
// import CustomButton from '../CustomButton';

// interface JobItemProps {
//   job: {
//     id: string;
//     name: string;
//     companyName: string;
//     location: string;
//     description: string;
//     salary: number;
//   };
// }

// const JobItem: React.FC<JobItemProps> = ({ job }) => {
//   const handleApply = async () => {
//     try {
//       await applyForJob(job.id);
//       alert('Application submitted successfully!');
//     } catch (error) {
//       alert('Failed to apply for job.');
//     }
//   };

//   const handleWithdraw = async () => {
//     try {
//       await withdrawApplication(job.id);
//       alert('Application withdrawn successfully!');
//     } catch (error) {
//       alert('Failed to withdraw application.');
//     }
//   };

//   return (
//     <div className="bg-white p-4 rounded border-2 border-black flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
//       <div className="flex items-start space-x-4">
//         <img src="/work-svgrepo-com.svg" alt="work" width={25} />
//         <div>
//        <div>
//        <h2 className="text-xl font-bold">{job.companyName} - {job.name}</h2>
//           <p className="text-black max-w-[40ch]">{job.description}</p>
//           <p>Location: {job.location}</p>
//           <p>Salary: {job.salary}$</p>
//        </div>
//           <div className="flex space-x-2 mt-2">
//             <button className="border p-1 flex-1">ipsum</button>
//             <button className="border p-1 flex-1">ipsum</button>
//             <button className="border p-1 flex-1">ipsum</button>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col space-y-2">
//         <CustomButton label="Detail" onClick={() => {}} />
//         <CustomButton label="Withdraw" onClick={handleWithdraw} textColor="black" buttonColor="white" />
//       </div>
//     </div>
//   );
// };

// export default JobItem;
