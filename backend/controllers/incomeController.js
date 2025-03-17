const xlsx = require("xlsx");
const Income = require("../models/Income.js")
//Add income source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        // Extract data from request body
        const { icon, source, amount, date } = req.body;

        // Validation: Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new Income entry
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date) // Ensure date is in proper format
        });

        // Save the income record to the database
        await newIncome.save();

        // Send success response
        res.status(200).json(newIncome);

    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: "Server Error" });
    }

}

//Get All income source
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ data: -1 });
        res.json(income);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

//Delete income source
exports.deleteIncome = async (req, res) => {
    try {
        const income = await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

//Download Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id; // Get user ID from request

    try {
        // Fetch income records for the user, sorted by date (newest first)
        const income = await Income.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date, // Format date as YYYY-MM-DD
        }));

        // Create a new Excel workbook and worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Define the file path
        const filePath = "income_details.xlsx";

        // Write the Excel file
        xlsx.writeFile(wb, filePath);

        // Send the file as a response
        res.download(filePath, "income_details.xlsx", (err) => {
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