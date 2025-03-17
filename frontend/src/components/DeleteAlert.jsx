import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const DeleteAlert = ({ content, onDelete }) => {
    const { theme } = useContext(ThemeContext);
    return (
        <div>
            <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{content}</p>

            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    className='add-btn add-btn-fill bg-red-500 text-white dark:bg-red-600 dark:text-white'
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteAlert;
