import React, { useEffect, useState } from 'react';
import { AuthLogo, Eye, EyeClose, PasswordResetIcon } from '../../assets/SVG';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { RESET, resetPassword } from '../../redux/features/auth/authSlice';
import toast from 'react-hot-toast';


const ResetPassword = () => {
  const [isPasswordHidden1, setIsPasswordHidden1] = useState(true);
  const [isPasswordHidden2, setIsPasswordHidden2] = useState(true);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const { isLoading, message, isSuccess } = useSelector((state) => state.auth);


  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error('Required Field is Missing!');
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password && confirmPassword)) {
      return toast.error('Password must contain both lowercase and uppercase letters!');
    }

    if (!/\d/.test((password && confirmPassword))) {
      return toast.error('Password must contain at least one number!');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test((password && confirmPassword))) {
      return toast.error('Password must contain at least one special character!');
    }

    if ((password.length < 6 && confirmPassword.length < 6)) {
      return toast.error('Password must be at least 6 characters long!');
    }

    if (password !== confirmPassword) {
      return toast.error('Password fields don\'t match!');
    }

    const userData = {
      password
    }

    await dispatch(resetPassword({ 
      resetPasswordToken: resetToken, 
      userData: userData 
    })).unwrap();

    await dispatch(RESET());
  };


  useEffect(() => {
    if (isSuccess && message.includes("Password Reset Successful, please login")) {
      navigate("/login");
    }

    dispatch(RESET());
  }, [dispatch, navigate, message, isSuccess]);


  const togglePasswordVisibility1 = () => {
    setIsPasswordHidden1((prev) => !prev);
  };


  const togglePasswordVisibility2 = () => {
    setIsPasswordHidden2((prev) => !prev);
  };



  if (isLoading) return <Loader />;

  return (
    <>
      <div className='min-h-screen w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]'>
        <div className='flex flex-col items-center pt-5'>
          <div className='flex items-center justify-center'>
            <AuthLogo className='size-14' />
            <h1 className='pixelMonoFont text-4xl'>://AuthN</h1>
          </div>

          <h1 className='pixelMonoFont text-5xl text-center mt-12 mb-3'>Create a New Password</h1>

          <form
            onSubmit={formSubmitHandler}
            className='border-black border flex items-center justify-center flex-col bg-opacity-10 backdrop-blur-[2px] w-[90vw] sm:w-[50vw] p-6 lg:w-[500px] mb-10'
          >
            <div className='w-full'>
              <Link to="/" className='underline underline-offset-4 font-black'> &lt; Home </Link>
            </div>

            <div className='w-full text-center mb-4'>
              <PasswordResetIcon className='w-13 mx-auto' />
              <h1 className='pixelMonoFont text-5xl'>Reset Password</h1>
            </div>

            <div className='relative w-full'>
              <input
                type={isPasswordHidden1 ? "password" : "text"}
                placeholder='Password'
                className='border border-black focus:outline-none px-2 py-1 w-full mb-2'
                required
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={togglePasswordVisibility1}
                className='absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer mb-2'
                aria-label={isPasswordHidden1 ? 'Show password' : 'Hide password'}
              >
                {isPasswordHidden1 ? <Eye className="size-4 bg-white" /> : <EyeClose className="size-4 bg-white" />}
              </div>
            </div>

            <div className='relative w-full'>
              <input
                type={isPasswordHidden2 ? "password" : "text"}
                placeholder='Confirm Password'
                className='border border-black focus:outline-none px-2 py-1 w-full mb-2'
                required
                name='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                onClick={togglePasswordVisibility2}
                className='absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer mb-2'
                aria-label={isPasswordHidden2 ? 'Show password' : 'Hide password'}
              >
                {isPasswordHidden2 ? <Eye className="size-4 bg-white" /> : <EyeClose className="size-4 bg-white" />}
              </div>
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
}

export default ResetPassword;