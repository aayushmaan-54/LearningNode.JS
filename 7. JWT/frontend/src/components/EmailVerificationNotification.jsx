import React from 'react';
import { useDispatch } from 'react-redux';
import { RESET, sendVerificationEmail } from '../redux/features/auth/authSlice';


const EmailVerificationNotification = () => {
  const dispatch = useDispatch();
  
  const resendVerificationEmail = async () => {
    await dispatch(sendVerificationEmail());
    await dispatch(RESET());
  }

  return (
    <aside className='flex items-center justify-center w-screen'>
      <div className='border border-black px-4 py-2 sm:w-[90vw]'>
        <p> <span className='font-extrabold'>Message: </span> To verify your account, Check your email for a verification link. <span onClick={resendVerificationEmail} className='underline cursor-pointer'>Resend Link</span></p>
      </div>
    </aside>
  );
}


export default EmailVerificationNotification;