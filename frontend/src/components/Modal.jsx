import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    const { theme } = useContext(ThemeContext);
    const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
    const textColor = theme === 'dark' ? 'text-white' : 'text-black';
    const borderColor = theme === 'dark' ? 'border-gray-600' : 'border-gray-200';

    return (
        <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50'>
            <div className={`relative p-4 w-full max-w-2xl max-h-full ${bgColor} rounded-lg shadow-sm ${borderColor}`}>
                {/* Modal Header */}
                <div className={`flex items-center justify-between p-4 md:p-5 border-b rounded-t ${borderColor}`}>
                    <h5 className={`text-lg font-medium ${textColor}`}>{title}</h5>

                    <button
                        type='button'
                        className='text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg text-sm w-8 h-8 flex justify-center items-center cursor-pointer'
                        onClick={onClose}
                    >
                        <svg
                            className='w-3 h-3'
                            aria-hidden="true"
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 14 14'
                        >
                            <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth="2"
                                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                            />
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <div className={`p-4 md:p-5 space-y-4 ${textColor}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
