import React from 'react';
import { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <div className="p-2 bg-gray-200 border-2 border-black">
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-4">
        <span className="ml-3 font-bold">{t('basic_filter')}</span>
        <select className="border-2 border-black p-1 rounded" {...register('filterField')}>
          <option value="">{t('select_field')}</option>
          <option value="name">{t('job_name')}</option>
          <option value="companyName">{t('company_name')}</option>
          <option value="location">{t('location')}</option>
        </select>
        <input
          type="text"
          placeholder={t('search')}
          className="border-2 border-black rounded"
          {...register('query')}
        />
        <button type="submit" className="p-1 bg-white rounded-full">
          <img src="/path-to-search-icon.svg" width={30} alt={t('search')} />
        </button>
      </form>
    </div>
  );
};

export default FilterForm;
