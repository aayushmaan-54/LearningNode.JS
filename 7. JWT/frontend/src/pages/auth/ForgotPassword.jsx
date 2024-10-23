import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLogo, Lock } from '../../assets/SVG';
import { validateEmail } from '../../redux/features/auth/authService';
import { useDispatch, useSelector } from 'react-redux';
import { sendforgotPasswordEmail, RESET } from '../../redux/features/auth/authSlice';
import Loader from '../../components/Loader';


const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState('');
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);


  const formSubmitHandler = async(e) => {
    e.preventDefault();
    
    if(!emailInput) {
      return toast.error('Enter Email!');
    }

    if(!validateEmail(emailInput)) {
      return toast.error('Please Enter a Valid Email!');
    }

    const userData = { email: emailInput };

    await dispatch(sendforgotPasswordEmail(userData));
    await dispatch(RESET());
  };


  if(isLoading) return <Loader />;

  return (
    <>
      <div className='min-h-screen w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]'>
        <div className='flex flex-col items-center pt-5'>
          <div className='flex items-center justify-center'>
            <AuthLogo className='size-14' />
            <h1 className='pixelMonoFont text-4xl'>://AuthN</h1>
          </div>

          <h1 className='pixelMonoFont text-5xl text-center mt-12 mb-3'>Need Help Getting In?</h1>

          <form 
            onSubmit={formSubmitHandler} 
            className='border-black border flex items-center justify-center flex-col bg-opacity-10 backdrop-blur-[2px] w-[90vw] sm:w-[50vw] p-6 lg:w-[500px] mb-10'
          >
            <div className='w-full'>
              <Link to="/" className='underline underline-offset-4 font-black'> &lt; Home </Link>
            </div>

            <div className='w-full text-center mb-4'>
              <Lock className='w-13 mx-auto' />
              <h1 className='pixelMonoFont text-5xl'>Forgot Password</h1>
            </div>

            <div className='w-full space-y-4'>
              <input
                type="email"
                placeholder='john.doe45@gmail.com'
                className='border border-black focus:outline-none px-2 py-1 w-full mb-3'
                required
                name='email'
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className='bg-black text-white w-full py-2 border border-black hover:bg-white hover:text-black'
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;