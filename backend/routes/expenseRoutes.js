const express = require("express");
const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel // Fixed function name (no space)
} = require("../controllers/expenseController.js");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router(); // Fixed `express. Router();` → `express.Router();`

// Define routes with authentication middleware
router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel); // Fixed function name
router.delete("/:id", protect, deleteExpense);

module.exports = router;
