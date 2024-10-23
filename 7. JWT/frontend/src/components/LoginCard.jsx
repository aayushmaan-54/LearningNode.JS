import React, { useEffect, useState } from 'react';
import { Eye, EyeClose, FingerPrint } from '../assets/SVG';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../redux/features/auth/authService';
import { login, loginUsingGoogle, RESET, sendLoginCode } from '../redux/features/auth/authSlice';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';


const LoginCard = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const { email, password, rememberMe } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, isSuccess, isError, twoFactor } = useSelector((state) => state.auth);

  const passwordVisibilityHandler = () => {
    setIsPasswordHidden((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  
  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error('Required Field is Missing!');
    }

    if (!validateEmail(email)) {
      return toast.error('Please Enter a Valid Email!');
    }

    const userData = {
      email,
      password,
      rememberMe
    };

    localStorage.setItem('email', email);
    localStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');

    await dispatch(login(userData));
  };


  useEffect(() => {
    const email = localStorage.getItem('email');

    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }

    if (isError && twoFactor) {
      dispatch(sendLoginCode(email));
      navigate(`/loginWithCode/${email}`);
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, isError, twoFactor]);


  const googleLogin = async (credentialResponse) => {
    await dispatch(loginUsingGoogle({ userToken: credentialResponse.credential })); // this is JWT
  }


  return (
    <form onSubmit={loginUser}>
      <div className='border-black border flex items-center justify-center flex-col bg-opacity-10 backdrop-blur-[2px] w-[90vw] sm:w-[50vw] p-6 lg:w-[500px] mb-10'>
        <div className='w-full'>
          <Link to="/" className='underline underline-offset-4 font-black'> &lt; Home </Link>
        </div>

        <div className='w-full text-center mb-4'>
          <FingerPrint className='w-13 mx-auto' />
          <h1 className='pixelMonoFont text-5xl'>LogIn</h1>
        </div>

        <div className='w-full space-y-4'>
          <input
            type="email"
            placeholder='john.doe45@gmail.com'
            className='border border-black focus:outline-none px-2 py-1 w-full'
            required
            name='email'
            value={email}
            onChange={handleInputChange}
          />
          <div className='relative w-full'>
            <input
              type={isPasswordHidden ? "password" : "text"}
              placeholder='password123'
              className='border border-black focus:outline-none px-2 py-1 w-full'
              required
              name='password'
              value={password}
              onChange={handleInputChange}
            />
            <div
              onClick={passwordVisibilityHandler}
              className='absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer'
              aria-label={isPasswordHidden ? 'Show password' : 'Hide password'}
            >
              {isPasswordHidden ? <Eye className="size-4 bg-white" /> : <EyeClose className="size-4 bg-white" />}
            </div>
          </div>

          <button type="submit" className='bg-black text-white w-full py-2 border border-black hover:bg-white hover:text-black'>Login</button>

          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center justify-center gap-1'>
              <input
                type="checkbox"
                id='rememberMe'
                className='accent-black'
                name='rememberMe'
                checked={rememberMe}
                onChange={handleInputChange}
              />
              <label htmlFor="rememberMe" className='text-[13px]'> Remember me</label>
            </div>

            <Link to="/forgot-password" className='underline text-[13px]'>Forgot Password</Link>
          </div>

          <p className='text-[13px] mt-4'>Don't have an account? <Link to="/sign-up" className='underline'>Register</Link></p>

          <div className="relative w-full my-8">
            <hr className="w-full h-px bg-black border-0" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 font-medium text-gray-900 bg-white">
              or
            </span>
          </div>

          <div className='flex items-center justify-center'>
            <GoogleLogin
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className='border border-black py-2 px-1 hover:bg-black hover:text-white w-full rounded-none'
                >
                  Sign in with Google
                </button>
              )}
              onSuccess={googleLogin}
              onError={() => {
                console.log('Login using Google Failed!');
                toast.error('Login using Google Failed!');
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginCard;