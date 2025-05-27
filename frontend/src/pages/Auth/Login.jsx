import React, { useContext, useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Inputs';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import { ThemeContext } from '../../context/ThemeContext';

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle login submit
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter the password');
      return;
    }
    setError('');

    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  // Handle guest login
  const handleGuestLogin = () => {
    const guestUser = {
      id: 'guest-id',
      fullName: 'Guest User',
      email: 'guest@example.com',
      profileImageUrl: '',
    };
    localStorage.setItem('token', 'guest-token'); // Add a mock token for guest user
    updateUser(guestUser);
    navigate('/dashboard');
  };

  return (
    <AuthLayout>
      <div className='w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8'>
        <h3 className={`text-xl sm:text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'} text-center`}>Welcome Back</h3>
        <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-50' : 'text-slate-700'} mt-2 mb-6 text-center`}>Please enter your details to log in</p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label='Email Address'
            placeholder='Enter your email'
            type='text'
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label='Password'
            placeholder='Min 8 Characters'
            type='password'
          />

          {error && <p className='text-red-500 text-xs sm:text-sm pb-2.5 text-center'>{error}</p>}

          <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3'>
            <button
              type='submit'
              className={`${
                theme === 'dark'
                  ? 'bg-blue-600 hover:bg-blue-500'
                  : 'bg-blue-500 hover:bg-blue-600'
              } btn-primary font-medium py-2 px-4 rounded-lg cursor-pointer transition-colors duration-200 flex-1`}
            >
              LOGIN
            </button>
            {/* <button
              type='button'
              onClick={handleGuestLogin}
              className={`${
                theme === 'dark'
                  ? 'bg-gray-600 hover:bg-gray-500'
                  : 'bg-gray-500 hover:bg-gray-600'
              } btn-primary font-medium py-2 px-4 rounded-lg cursor-pointer transition-colors duration-200 flex-1`}
            >
              GUEST LOGIN
            </button> */}
          </div>

          <p className={`text-[13px] sm:text-sm ${theme === 'dark' ? 'text-slate-50' : 'text-slate-800'} mt-4 text-center`}>
            Don't have an account?{' '}
            <Link className='font-medium text-blue-500 underline' to='/signUp'>
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;