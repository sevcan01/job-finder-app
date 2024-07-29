// 

import React from 'react';

interface ButtonProps {
  onClick: () => void;
  label: string;
  width?: string;
  height?: string;
  buttonColor?: string;
  textColor?: string;
}

const CustomButton: React.FC<ButtonProps> = ({ onClick, label, width = 'auto', height = 'auto', buttonColor = 'black', textColor = 'white' }) => {
  return (
    <div className="relative inline-block" style={{ width }}>
      <button
        onClick={onClick}
        className={`relative z-20 inline-block font-semibold border-2 rounded`}
        style={{ width: '100%', height, backgroundColor: buttonColor, borderColor: 'black', color: textColor }}
      >
        <span className="relative z-10">{label}</span>
      </button>
      <span
        className="absolute z-10 inset-0 transform bg-black translate-x-1 translate-y-1 border-1 rounded"
        style={{  borderColor: 'black', borderRadius: 'inherit' }}
      ></span>
    </div>
  );
};

export default CustomButton;
