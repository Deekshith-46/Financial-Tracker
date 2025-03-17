import React, { useContext } from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { ThemeContext } from '../../context/ThemeContext'; // Import ThemeContext

const CustomLineChart = ({ data }) => {
    const { theme } = useContext(ThemeContext); // Get the current theme

    // Custom Tooltip with Dark Mode Support
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={`p-2 rounded-lg border shadow-md 
                    ${theme === "dark" ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}>
                    
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
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={theme === "dark" ? "#c4b5fd" : "#875cf5"} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={theme === "dark" ? "#c4b5fd" : "#875cf5"} stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    {/* X and Y Axis without grid lines */}
                    <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: 12, fill: theme === "dark" ? "#ddd" : "#555" }} 
                        stroke="none" 
                    />
                    <YAxis 
                        tick={{ fontSize: 12, fill: theme === "dark" ? "#ddd" : "#555" }} 
                        stroke="none" 
                    />

                    <Tooltip content={<CustomTooltip />} />

                    {/* Area Chart Line and Fill */}
                    <Area 
                        type="monotone" 
                        dataKey="amount" 
                        stroke={theme === "dark" ? "#c4b5fd" : "#875cf5"} 
                        fill="url(#incomeGradient)" 
                        strokeWidth={3} 
                        dot={{ r: 3, fill: theme === "dark" ? "#c4b5fd" : "#ab8df8" }} 
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;
