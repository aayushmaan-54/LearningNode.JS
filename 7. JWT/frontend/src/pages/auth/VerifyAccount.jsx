import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RESET, verifyUser } from '../../redux/features/auth/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';


const VerifyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { verificationToken } = useParams();

  const { isLoading } = useSelector((state) => state.auth);

  const verifyUserAccount = async() => {
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET());
    navigate('/profile');
  }


  if(isLoading) return <Loader />;

  return (
    <>
      <section className='flex items-center justify-center flex-col mt-32'>
        <h1 className='pixelMonoFont text-6xl mb-7'>Account Verification</h1>
        <p>To verify your account, click the button below...</p>
        <button onClick={verifyUserAccount} className='bg-black text-white border border-black px-2 py-2 hover:bg-transparent hover:text-black mt-3'>Verify Account</button>
      </section>
    </>
  );
}

export default VerifyAccount;