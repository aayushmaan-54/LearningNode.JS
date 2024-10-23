import React from 'react';
import { AuthLogo } from '../../assets/SVG';
import SignUpCard from '../../components/SignUpCard';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';


const SignUp = () => {
  const { isLoading }  = useSelector((state) => state.auth);

  
  if(isLoading) return <Loader />;

  return (
    <div className='min-h-screen w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]'>
      <div className='flex flex-col items-center pt-5'>
        <div className='flex items-center justify-center'>
          <AuthLogo className='size-14' />
          <h1 className='pixelMonoFont text-4xl'>://AuthN</h1>
        </div>

        <h1 className='pixelMonoFont text-5xl text-center mt-12 mb-3'>Hello, there!</h1>

        <main className='flex items-center justify-center'>
          <SignUpCard />
        </main>
      </div>
    </div>
  );
}

export default SignUp;