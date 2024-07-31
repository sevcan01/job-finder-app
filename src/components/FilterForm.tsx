import React, { useEffect } from 'react';
import { useForm} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useDebounce from '../hooks/useDebounce'; // useDebounce hook'unun doğru yolda olduğundan emin olun

interface FilterFormInputs {
  query: string;
  filterField: string;
}

interface FilterFormProps {
  onSubmit: (data: FilterFormInputs) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, watch } = useForm<FilterFormInputs>();

  const watchedQuery = watch('query');
  const debouncedQuery = useDebounce(watchedQuery, 500);

  useEffect(() => {
    onSubmit({ query: debouncedQuery, filterField: watch('filterField') });
  }, [debouncedQuery, watch('filterField'), onSubmit]);

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
