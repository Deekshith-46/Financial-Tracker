import React, { use, useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Inputs';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import { ThemeContext } from '../../context/ThemeContext';

const Login = () => {
  const { theme } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();
  //Handle login submit
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    //Login API Call 
    try {
      // Send login request with email and password
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      // Extract token and user data from response
      const { token, user } = response.data;

      // If a token is received, store it and navigate to the dashboard
      if (token) {
        localStorage.setItem("token", token); // Save token in local storage
        updateUser(user);
        navigate("/dashboard"); // Redirect user to dashboard
      }
    } catch (error) {
      // Check if the error response has a message
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); // Show the error message from API
      } else {
        setError("Something went wrong. Please try again."); // Show a general error message
      }
    }
  }
  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Welcome Back</h3>
        <p className={`text-xs ${theme === 'dark' ? "text-slate-50" : "text-slate-700"} mt-[5px] mb-6`}>Please enter your details to log in</p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="Enter your email"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary cursor-pointer'>LOGIN</button>

          <p className={`text-[13px] ${theme === 'dark' ? "text-slate-50" : "text-slate-800"} mt-3`}>Don't have an account ? {""}
            <Link className="font-medium text-primary underline" to="/signUp">SignUp</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login