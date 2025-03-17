import React, { useState, useContext } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { ThemeContext } from '../../context/ThemeContext'; // Import ThemeContext

const Input = ({ value, onChange, placeholder, label, type }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { theme } = useContext(ThemeContext); // Get theme from context

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            {/* Label color changes dynamically based on theme */}
            <label className={`text-[13px] ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                {label}
            </label>

            <div className='input-box'>
                <input
                    type={type === "password" ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    className={`w-full bg-transparent outline-none ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                    value={value}
                    onChange={(e) => onChange(e)}
                />

                {type === "password" && (
                    showPassword ? (
                        <FaRegEye size={22} className={`${theme === 'dark' ? 'text-white' : 'text-primary'} cursor-pointer`}
                            onClick={() => toggleShowPassword()}
                        />
                    ) : (
                        <FaRegEyeSlash size={22} className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-400'} cursor-pointer`}
                            onClick={() => toggleShowPassword()}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Input;
