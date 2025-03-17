const express = require("express");
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel // Fixed function name (no space)
} = require("../controllers/incomeController.js");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router(); // Fixed `express. Router();` → `express.Router();`

// Define routes with authentication middleware
router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel); // Fixed function name
router.delete("/:id", protect, deleteIncome);

module.exports = router;
