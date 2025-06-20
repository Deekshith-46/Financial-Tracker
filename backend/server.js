require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB =require("./config/db.js")
const authRoutes = require("./routes/authRoutes.js");
const incomeRoutes = require("./routes/incomeRoutes.js")
const expenseRoutes = require("./routes/expenseRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js")

const app= express();


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

//Middelware to handle cors
app.use(cors({
    origin:['http://localhost:5173',"https://financial-tracker-frontend-five.vercel.app" || "*"],
    methods:["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
})
);

app.use(express.json());

connectDB();

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/income",incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/",(req,res)=>{
    res.send("Hello World")
})
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));