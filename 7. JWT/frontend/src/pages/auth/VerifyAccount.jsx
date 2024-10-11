import React from 'react';

const VerifyAccount = () => {
  return (
    <>
      <section className='flex items-center justify-center flex-col mt-32'>
        <h1 className='pixelMonoFont text-6xl mb-7'>Account Verification</h1>
        <p>To verify your account, click the button below...</p>
        <button className='bg-black text-white border border-black px-2 py-2 hover:bg-transparent hover:text-black mt-3'>Verify Account</button>
      </section>
    </>
  );
}

export default VerifyAccount;