import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AccessCode, AuthLogo } from '../../assets/SVG';

const CodeLogin = () => {
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log('Submitted email:', accessCodeInput);
  };

  const handleResendCode = () => {
    console.log('Resending code...');
    setTimer(60);
  };

  return (
    <>
      <div className='min-h-screen w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]'>
        <div className='flex flex-col items-center pt-5'>
          <div className='flex items-center justify-center'>
            <AuthLogo className='size-14' />
            <h1 className='pixelMonoFont text-4xl'>://AuthN</h1>
          </div>

          <h1 className='pixelMonoFont text-5xl text-center mt-12 mb-3'>Login using Access Code</h1>

          <form
            onSubmit={formSubmitHandler}
            className='border-black border flex items-center justify-center flex-col bg-opacity-10 backdrop-blur-[2px] w-[90vw] sm:w-[50vw] p-6 lg:w-[500px] mb-10'
          >
            <div className='w-full'>
              <Link to="/" className='underline underline-offset-4 font-black'> &lt; Home </Link>
            </div>

            <div className='w-full text-center mb-4'>
              <AccessCode className='w-13 mx-auto' />
              <h1 className='pixelMonoFont text-5xl'>Enter Access Code</h1>
            </div>

            <div className='w-full space-y-4'>
              <input
                type="text"
                placeholder='Access Code'
                className='border border-black focus:outline-none px-2 py-1 w-full'
                required
                name='accessCode'
                value={accessCodeInput}
                onChange={(e) => setAccessCodeInput(e.target.value)}
              />
            </div>

            <p className='mb-3 text-xs text-left w-full'>*Check your email for access code</p>

            <button
              type="submit"
              className='bg-black text-white w-full py-2 border border-black hover:bg-white hover:text-black'
            >
              Proceed to Login
            </button>

            <button
              onClick={handleResendCode}
              disabled={timer > 0}
              className={`mt-4 px-4 py-2 ${timer > 0 ? 'bg-gray-300 text-gray-600' : 'bg-black text-white border border-black hover:bg-transparent hover:text-black'
                }`}
            >
              {timer > 0 ? `Resend Code (${timer}s)` : 'Resend Code'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CodeLogin;