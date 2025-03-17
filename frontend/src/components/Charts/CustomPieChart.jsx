import React, { useContext } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';
import { ThemeContext } from '../../context/ThemeContext';

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
    const { theme } = useContext(ThemeContext);
    const textColor = theme === 'dark' ? '#ffffff' : '#333';

    return (
        <ResponsiveContainer width="100%" height={380}>
            <div className={`flex items-center justify-center mt-4 font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {label}: {totalAmount}
            </div>

            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                    isAnimationActive={true}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                            stroke={theme === 'dark' ? '#ffffff' : '#333'}
                        />
                    ))}
                </Pie>

                <Tooltip content={<CustomTooltip />} wrapperStyle={{ color: textColor }} />
                <Legend content={<CustomLegend />} />

                {showTextAnchor && (
                    <>
                        <text
                            x="50%"
                            y="50%"
                            dy={-25}
                            textAnchor="middle"
                            fill={textColor}
                            fontSize="14px"
                        >
                            {label}
                        </text>

                        <text
                            x="50%"
                            y="50%"
                            dy={8}
                            textAnchor="middle"
                            fill={textColor}
                            fontSize="22px"
                            fontWeight="bold"
                        >
                            {totalAmount}
                        </text>
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;
