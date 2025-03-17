const xlsx = require("xlsx");
const Expense = require("../models/Expense.js")
//Add Expense category
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        // Extract data from request body
        const { icon, category, amount, date } = req.body;

        // Validation: Check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new Expense entry
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date) // Ensure date is in proper format
        });

        // Save the expense record to the database
        await newExpense.save();

        // Send success response
        res.status(200).json(newExpense);

    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: "Server Error" });
    }

}

//Get All Expense category
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ data: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

//Delete expense category
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

//Download Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id; // Get user ID from request

    try {
        // Fetch expense records for the user, sorted by date (newest first)
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date, // Format date as YYYY-MM-DD
        }));

        // Create a new Excel workbook and worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");

        // Define the file path
        const filePath = "Expense_details.xlsx";

        // Write the Excel file
        xlsx.writeFile(wb, filePath);

        // Send the file as a response
        res.download(filePath, "Expense_details.xlsx", (err) => {
            if (err) {
                console.error("File download error:", err);
                res.status(500).json({ message: "Error downloading file" });
            }
        });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}