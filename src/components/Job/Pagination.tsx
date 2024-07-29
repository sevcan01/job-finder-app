// src/components/Pagination.tsx
import React, { useState } from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const [showOptions, setShowOptions] = useState(false);
  
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
          border: '2px solid black',
          borderRadius: '4px',
        }}
      >
        {i}
      </button>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:35 }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          margin: '0 5px',
          padding: '5px 10px',
          border: '2px solid black',
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
          border: '2px solid black',
        }}
      >
        Next
      </button>
      <div style={{ marginLeft: '25px', position: 'relative' }}>
        <button onClick={() => setShowOptions(!showOptions)} style={{ border: '2px solid black', padding: '5px 10px' }}>
          Show {`${currentPage} / ${totalPages}`}
        </button>
        {showOptions && (
          <div style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: 'white', border: '2px solid black', zIndex: 1 }}>
            {pages.map((page) => (
              <div key={page.key} onClick={() => setShowOptions(false)}>
                {page}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
