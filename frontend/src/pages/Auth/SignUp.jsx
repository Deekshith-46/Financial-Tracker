import React ,{useContext, useState} from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Inputs';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';
import { ThemeContext } from '../../context/ThemeContext';

const SignUp = () => {
  const { theme } = useContext(ThemeContext);

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [ password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  //Handle Sign Up Form Submit
  const handleSignUp = async(e)=>{
      e.preventDefault();
      let profileImageUrl="";
      if(!fullName){
        setError("Please enter your name");
        return;
      }
      if(!validateEmail(email)){
        setError("Please enter a valid email address");
        return;
      }
      if(!password){
        setError("Please enter the password");
        return;
      }

      setError("");
      //Signup API Call
      try {

        //upload image if present
        if(profilePic){
          const imgUploadRes = await uploadImage(profilePic);
          profileImageUrl =  imgUploadRes.imageUrl || ""; 
        }
        // Send sign-up request with user details
        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
          fullName,
          email,
          password,
          profileImageUrl
        });
    
        // Extract token and user data from response
        const { token, user } = response.data;
    
        // If a token is received, store it and update user context
        if (token) {
          localStorage.setItem("token", token); // Save token in local storage
          updateUser(user); // Update user context
          navigate("/dashboard"); // Redirect user to dashboard
        }
      } catch (error) {
        // Properly handle errors with missing curly braces
        if (error.response && error.response.data.message) {
          setError(error.response.data.message); // Show API error message
        } else {
          setError("Something went wrong. Please try again."); // Show a general error message
        }
      }
  }
  return (
    <AuthLayout>
        <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
          <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Create an Account</h3>
          <p className={`text-xs ${theme === 'dark' ? "text-slate-50" : "text-slate-700"} mt-[5px] mb-6`}>
            Join us today by entering your details below.
          </p>

          <form onSubmit={handleSignUp}>

              <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input 
                value={fullName}
                onChange={({target})=>setFullName(target.value)}
                label="Full Name"
                placeholder="Enter full name"
                type="text"
              />

              <Input 
                value={email}
                onChange={({target})=>setEmail(target.value)}
                label="Email Address"
                placeholder="Enter your email"
                type="text"
              />
              <div className='col-span-2'>
                <Input 
                  value={password}
                  onChange={({target})=>setPassword(target.value)}
                  label="Password"
                  placeholder="Min 8 Characters"
                  type="password"
                />
              </div>
            </div>

            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
            
                      <button type='submit' className='btn-primary cursor-pointer'>SIGN UP</button>
            
                      <p className={`text-[13px] ${theme === 'dark' ? "text-slate-50" : "text-slate-800"} mt-3`}>Already have an account ? {""}
                        <Link className="font-medium text-primary underline" to="/login">Login</Link>
                      </p>
          </form>
        </div>
    </AuthLayout>
  )
}

export default SignUp