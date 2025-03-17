import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];
const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {

    const balanceData = [
        { name: "Total Balance", amount: Math.max(Number(totalBalance), 1) },
        { name: "Total Expenses", amount: Math.max(Number(totalExpense), 1) },
        { name: "Total Income", amount: Math.max(Number(totalIncome), 1) }
    ];

    console.log("Formatted Balance Data:", totalBalance); 
    console.log(totalBalance);
    // Debugging

    return (
        <div className='card'>
            <div className='flex items-center '>
                <h5 className='text-lg'>Financial Overview</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`$${totalBalance}`}
                colors={COLORS}
                showTextAnchor={true}
            />
        </div>
    );
};

export default FinanceOverview;