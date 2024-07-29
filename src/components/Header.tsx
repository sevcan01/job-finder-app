import React from 'react';


interface HeaderProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;

}

const Header: React.FC<HeaderProps> = ({ onSubmit }) => {
  return (
    <header className="bg-[#9d9a9a] w-full shadow p-4 flex items-center border-b-2 border-black">
      <div className="flex items-center space-x-2">
        <div className="p-2">
          <img src="/left.svg" alt="Back" width={30} />
        </div>
        <div className="p-2">
          <img src="/right.svg" width={30} alt="Forward" />
        </div>
      </div>
      <div className="flex items-center space-x-2 ml-4 mr-4">
        <div className="p-2">
          <img src="/path-to-close-icon.svg" width={30} alt="Close" />
        </div>
        <div className="p-2">
          <img src="/path-to-home-icon.svg" alt="Home" width={30} />
        </div>
      </div>
      <form onSubmit={onSubmit} className="ml-auto flex items-center w-full bg-white p-2 rounded mr-2">
        <input

          type="text"
          placeholder="https://"
          className="flex-grow border-none outline-none h-3"
        />
      </form>
        <button type="submit" className="p-1 bg-white rounded-full">
          <img src="/path-to-search-icon.svg" width={30} alt="Search" />
        </button>
    </header>
  );
};

export default Header;
