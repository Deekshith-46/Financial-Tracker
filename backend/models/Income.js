const mongoose = require("mongoose");

// Define the Income schema
const IncomeSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    icon: { type: String }, // Optional field for an icon
    source: { type: String, required: true }, // Example: Salary, Freelance, etc.
    amount: { type: Number, required: true }, // Income amount
    date: { type: Date, default: Date.now } // Default to current date
}, { timestamps: true }); // Adds createdAt & updatedAt timestamps

// Export the Income model
module.exports = mongoose.model("Income", IncomeSchema);
