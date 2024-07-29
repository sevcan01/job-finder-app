import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        style={{
          fontWeight: currentPage === i ? 'bold' : 'normal',
          margin: '0 5px',
          padding: '5px 10px',
        //   border: '1px solid black',
          borderRadius: '4px',
        }}
      >
        {i}
      </button>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          margin: '0 5px',
          padding: '5px 10px',
          
        }}
      >
        Previous
      </button>
      {pages}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          margin: '0 5px',
          padding: '5px 10px',
        
        }}
      >
        Next
      </button>
      <span style={{ marginLeft: '20px' }}> Show {`${currentPage} / ${totalPages}`}</span>
    </div>
  );
};

export default Pagination;
