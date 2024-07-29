import React, { useState } from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectPage = (page: number) => {
    setIsDropdownOpen(false);
    onPageChange(page);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => handleSelectPage(i)}
        style={{
          fontWeight: currentPage === i ? 'bold' : 'normal',
          margin: '0 5px',
          padding: '5px 10px',
          border: '2px solid black', // Border kalınlığı ayarı
          borderRadius: '4px',
        }}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center mt-4 ">
      <div className="flex justify-center items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-2 p-2 border-2 border-black" // Border kalınlığı ayarı
        >
          Previous
        </button>
        <div className="relative ">
          <button
            onClick={handleToggleDropdown}
            className="mx-2 p-2 border-2 border-black" // Border kalınlığı ayarı
          >
            Show {`${currentPage} / ${totalPages}`}
          </button>
          {isDropdownOpen && (
            <div className="absolute top-8 left-0 bg-white border-2 border-black rounded shadow-md p-2 z-10">
              {pages}
            </div>
          )}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="mx-2 p-2 border-2 border-black" // Border kalınlığı ayarı
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
