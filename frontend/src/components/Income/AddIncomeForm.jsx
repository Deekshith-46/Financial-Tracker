import React, { useState, useContext } from 'react';
import Input from "../Inputs/Inputs";
import EmojiPickerPopup from '../EmojiPickerPopup';
import { ThemeContext } from '../../context/ThemeContext'; // Import ThemeContext

const AddIncomeForm = ({ onAddIncome }) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: ""
    });

    const { theme } = useContext(ThemeContext); // Get theme mode

    const handleChange = (key, value) => setIncome({ ...income, [key]: value });

    return (
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={income.source}
                onChange={({ target }) => handleChange("source", target.value)}
                label="Income Source"
                placeholder="Freelance, Salary, etc.."
                type="text"
            />

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder=""
                type="number"
            />

            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    className={`add-btn add-btn-fill transition-all duration-300
                        ${theme === 'dark' ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-primary text-white hover:bg-purple-700'}`}
                    onClick={() => onAddIncome(income)}
                >
                    Add Income
                </button>
            </div>
        </div>
    );
};

export default AddIncomeForm;
