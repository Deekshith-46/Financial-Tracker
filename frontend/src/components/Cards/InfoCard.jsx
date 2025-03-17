import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const InfoCard = ({ icon, label, value, color }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`flex gap-6 p-6 rounded-2xl shadow-md border transition-all ${
      theme === 'dark' 
        ? 'bg-gray-800 text-white shadow-gray-900 border-gray-700' 
        : 'bg-white text-black shadow-gray-100 border-gray-200'
    }`}>
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
      </div>
      <div>
        <h6 className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
          {label}
        </h6>
        <span className='text-[22px]'>{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
