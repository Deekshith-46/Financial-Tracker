import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ThemeContext } from '../../context/ThemeContext'; // Ensure ThemeContext is imported

const CustomBarChart = ({ data }) => {
    const { theme } = useContext(ThemeContext); // Get the current theme

    // Function to determine bar colors dynamically based on theme
    const getBarColor = (index) => {
        return theme === "dark"
            ? (index % 2 === 0 ? "#a78bfa" : "#c4b5fd") // Light purple shades for dark mode
            : (index % 2 === 0 ? "#875cf5" : "#cfbefb"); // Original colors for light mode
    };

    // Custom Tooltip with Dark Mode Support
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={`p-2 rounded-lg border shadow-md ${theme === "dark" ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}>
                    <p className="text-xs font-semibold mb-1">{payload[0].payload.category}</p>
                    <p className="text-sm">
                        Amount: <span className="font-medium">${payload[0].payload.amount}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={`mt-6 p-4 rounded-lg ${theme === "dark" ? "bg-gray-900" : "bg-white"} shadow-md`}>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    {/* X and Y Axis without grid lines */}
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: theme === "dark" ? "#ddd" : "#555" }} stroke="none" />
                    <YAxis tick={{ fontSize: 12, fill: theme === "dark" ? "#ddd" : "#555" }} stroke="none" />

                    {/* Custom Tooltip */}
                    <Tooltip content={<CustomTooltip />} />
                    {/* <Legend wrapperStyle={{ color: theme === "dark" ? "#fff" : "#000" }} /> */}

                    <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={index} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;
