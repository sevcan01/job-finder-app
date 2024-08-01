import React, { useEffect } from 'react';
import { UseFormRegister, UseFormHandleSubmit, useForm} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useDebounce from '../hooks/useDebounce';
import { SearchFormInputs } from '../pages/JobListingsPage';

interface FilterFormProps {
  onSubmit: (data: SearchFormInputs) => void;
  register: UseFormRegister<SearchFormInputs>;
  handleSubmit: UseFormHandleSubmit<SearchFormInputs>;
}

const FilterForm: React.FC<FilterFormProps> = ({ onSubmit, register, handleSubmit }) => {
  const { t } = useTranslation();
  const { watch } = useForm<SearchFormInputs>();
  const watchedQuery = watch('query');
  const watchedFilterField = watch('filterField');
  const debouncedQuery = useDebounce(watchedQuery, 500);

  useEffect(() => {
    if (debouncedQuery !== undefined || watchedFilterField !== undefined) {
      onSubmit({ query: debouncedQuery, filterField: watchedFilterField });
    }
  }, [debouncedQuery, watchedFilterField, onSubmit]);

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
      </form>
    </div>
  );
};

export default FilterForm;
