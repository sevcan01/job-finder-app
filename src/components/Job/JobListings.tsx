import * as React from 'react';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import JobItem from './JobItem';


const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
});

interface Job {
  id: string;
  name: string;
  companyName: string;
  location: string;
  description: string;
  salary: number;
}

interface JobListingsProps {
  jobs: Job[];
}

const JobListings: React.FC<JobListingsProps> = ({ jobs }) => {
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 2;
  const count = Math.ceil(jobs.length / itemsPerPage);

  const { items } = usePagination({
    count,
    page,
    onChange: (event, value) => {
      setPage(value);
    },
  });

  const startIndex = (page - 1) * itemsPerPage;
  const selectedJobs = jobs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div>
        {selectedJobs.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </div>
      <nav>
        <List>
          {items.map(({ page, type, selected, ...item }, index) => {
            let children = null;

            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              children = '…';
            } else if (type === 'page') {
              children = (
                <button
                  type="button"
                  style={{
                    fontWeight: selected ? 'bold' : undefined,
                  }}
                  {...item}
                >
                  {page}
                </button>
              );
            } else {
              children = (
                <button type="button" {...item}>
                  {type}
                </button>
              );
            }

            return <li key={index}>{children}</li>;
          })}
        </List>
      </nav>
    </div>
  );
};

export default JobListings;
