import React, { useContext } from 'react';
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from 'react-icons/lu';
import { ThemeContext } from '../../context/ThemeContext'; // Ensure ThemeContext is imported

const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete }) => {
    const { theme } = useContext(ThemeContext); // Get the current theme

    const getAmountStyles = () =>
        type === "income"
            ? "bg-green-100 text-green-600 dark:bg-green-800/50 dark:text-green-400"
            : "bg-red-100 text-red-600 dark:bg-red-800/50 dark:text-red-400";

    return (
        <div className={`group relative flex items-center gap-4 mt-2 p-3 rounded-lg 
            ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/60'}`}>
            
            {/* Transaction Icon */}
            <div className={`w-12 h-12 flex items-center justify-center text-xl rounded-full 
                ${theme === 'dark' ? 'bg-gray-100 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                {icon ? (
                    <img src={icon} alt={title} className='w-6 h-6' />
                ) : (
                    <LuUtensils />
                )}
            </div>
            
            {/* Transaction Details */}
            <div className='flex-1 flex items-center justify-between'>
                <div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{title}</p>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{date}</p>
                </div>

                <div className='flex items-center gap-2'>
                    {/* Delete Button */}
                    {!hideDeleteBtn && (
                        <button 
                            className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                            onClick={onDelete}
                        >
                            <LuTrash2 size={18} />
                        </button>
                    )}

                    {/* Amount Section */}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                        <h6 className='text-xs font-medium'>
                            {type === "income" ? "+" : "-"} ${amount}
                        </h6>
                        {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionInfoCard;
