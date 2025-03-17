
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/UserContext";
import ThemeProvider from "./context/ThemeContext"; // ✅ Import ThemeProvider
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <ThemeProvider> {/* ✅ Wrap the entire app */}
      <UserProvider>
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<Root />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/signUp" exact element={<SignUp />} />
              <Route path="/dashboard" exact element={<Home />} />
              <Route path="/income" exact element={<Income />} />
              <Route path="/expense" exact element={<Expense />} />
            </Routes>
          </Router>
        </div>
        <Toaster toastOptions={{ style: { fontSize: "13px" } }} />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;

const Root = ()=>{
  //Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");
  //Redirect to dashboard if Authenticated , otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard"/> )
    : (
    <Navigate to="/login"/> 
  )
}
