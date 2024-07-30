import React from 'react';
import { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';

interface FilterFormInputs {
  query: string;
  filterField: string;
}

interface FilterFormProps {
  register: UseFormRegister<FilterFormInputs>;
  handleSubmit: UseFormHandleSubmit<FilterFormInputs>;
  onSubmit: (data: FilterFormInputs) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ register, handleSubmit, onSubmit }) => {
  return (
    <div className="p-2 bg-gray-200 border-2 border-black">
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-4">
        <span className="ml-3 font-bold">Basic Filter</span>
        <select className="border-2 border-black p-1 rounded" {...register('filterField')}>
          <option value="">Select a Field</option>
          <option value="name">Job Name</option>
          <option value="companyName">Company Name</option>
          <option value="location">Location</option>
        </select>
        <input
          type="text"
          placeholder="Search"
          className="border-2 border-black rounded"
          {...register('query')}
        />
        <button type="submit" className="p-1 bg-white rounded-full">
          <img src="/path-to-search-icon.svg" width={30} alt="Search" />
        </button>
      </form>
    </div>
  );
};

export default FilterForm;
