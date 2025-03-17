const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!isValidObjectId(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const userObjectId = new Types.ObjectId(String(userId));

        // Fetch total income
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);  

        // Fetch total expenses
        const totalExpense = await Expense.aggregate([
            { $match: { userId: new Types.ObjectId(userId) } },  // Ensuring correct ObjectId
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        
        // console.log("totalExpense", totalExpense);  // Debugging
        

        // Fix: Fetch transactions from the last full month instead of last 30 days
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1); // Last month start

        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: startOfMonth }  // Fetch last full month's transactions
        }).sort({ date: -1 });

        // console.log("Expense Transactions (Last 30 Days):", last30DaysExpenseTransactions);

        // Fix: Ensure correct total amount calculation
        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + Number(transaction.amount || 0),  // Ensure it's a number
            0
        );
        

        // Fix: Correctly calculate the last 60 days income
        const last60DaysStart = new Date();
        last60DaysStart.setDate(today.getDate() - 60);
        last60DaysStart.setHours(0, 0, 0, 0);

        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: last60DaysStart }
        }).sort({ date: -1 });

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + (transaction.amount || 0),
            0
        );

        // Fetch last 5 transactions (income + expenses)
        const lastTransactions = [
            ...(await Income.find({ userId })
                .sort({ date: -1 })
                .limit(5)).map((txn) => ({
                    ...txn.toObject(),
                    type: "income"
                })
            ),
            ...(await Expense.find({ userId })
                .sort({ date: -1 })
                .limit(5)).map((txn) => ({
                    ...txn.toObject(),
                    type: "expense"
                })
            ),
        ].sort((a, b) => b.date - a.date);

        // Final Response
        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expensesLast30Days,
                transactions: last30DaysExpenseTransactions
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions
            },
            recentTransactions: lastTransactions
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
