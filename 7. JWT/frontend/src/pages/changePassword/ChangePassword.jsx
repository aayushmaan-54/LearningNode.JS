import React, { useState } from 'react';
import Menu from '../../components/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeClose, LockPassword } from '../../assets/SVG';
import Footer from '../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import useRedirectLoggedOutUser from '../../hooks/useRedirectLoggedOutUser';
import { changePassword, logout, RESET } from '../../redux/features/auth/authSlice';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';


const ChangePassword = () => {
  useRedirectLoggedOutUser('/login');

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword1: '',
    newPassword2: '',
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword1: false,
    newPassword2: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((state) => state.auth);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const togglePasswordVisibility = (field) => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      [field]: !prevShowPassword[field],
    }));
  };


  const formSubmitHandler = async(e) => {
    e.preventDefault();

    const { oldPassword, newPassword1, newPassword2 } = formData;

    if (!oldPassword || !newPassword1 || !newPassword2) {
      return toast.error('Required Field is Missing!');
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(newPassword1 && newPassword2)) {
      return toast.error('Password must contain both lowercase and uppercase letters!');
    }

    if (!/\d/.test((newPassword1 && newPassword2))) {
      return toast.error('Password must contain at least one number!');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test((newPassword1 && newPassword2))) {
      return toast.error('Password must contain at least one special character!');
    }

    if ((newPassword1.length < 6 && newPassword2.length < 6)) {
      return toast.error('Password must be at least 6 characters long!');
    }

    if (newPassword1 !== newPassword2) {
      return toast.error('Password fields don\'t match!');
    }

    const userData = {
      oldPassword,
      newPassword: newPassword1
    }

    await dispatch(changePassword(userData));
    await dispatch(logout());
    await dispatch(RESET());
    navigate('/login');
  };

  
  if(isLoading) return <Loader />;

  return (
    <section className='flex items-center justify-center flex-col'>
      <h1 className='pixelMonoFont text-5xl mt-6'>Change Password</h1>

      <Menu />

      <form onSubmit={formSubmitHandler} className='min-h-screen w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] flex items-start justify-center mt-12'>
        <div className='border-black border flex items-center justify-center flex-col bg-opacity-10 backdrop-blur-[2px] w-[90vw] sm:w-[50vw] p-6 lg:w-[500px]'>
          <div className='w-full'>
            <Link to="/" className='underline underline-offset-4 font-black'>&lt; Home</Link>
          </div>

          <div className='w-full text-center mb-4 flex items-center justify-center flex-col'>
            <LockPassword className='mx-auto' />
            <h1 className='pixelMonoFont text-4xl'>Change Password</h1>
          </div>

          <div className='w-full space-y-4'>
            <div className='relative w-full'>
              <input
                type={showPassword.oldPassword ? "text" : "password"}
                placeholder='Old Password'
                className='border border-black focus:outline-none px-2 py-1 w-full'
                required
                name='oldPassword'
                value={formData.oldPassword}
                onChange={handleInputChange}
              />
              <div
                onClick={() => togglePasswordVisibility('oldPassword')}
                className='absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer'
                aria-label={showPassword.oldPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword.oldPassword ? <Eye className="size-4 bg-white" /> : <EyeClose className="size-4 bg-white" />}
              </div>
            </div>

            <div className='relative w-full'>
              <input
                type={showPassword.newPassword1 ? "text" : "password"}
                placeholder='New Password'
                className='border border-black focus:outline-none px-2 py-1 w-full'
                required
                name='newPassword1'
                value={formData.newPassword1}
                onChange={handleInputChange}
              />
              <div
                onClick={() => togglePasswordVisibility('newPassword1')}
                className='absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer'
                aria-label={showPassword.newPassword1 ? 'Hide password' : 'Show password'}
              >
                {showPassword.newPassword1 ? <Eye className="size-4 bg-white" /> : <EyeClose className="size-4 bg-white" />}
              </div>
            </div>

            <div className='relative w-full'>
              <input
                type={showPassword.newPassword2 ? "text" : "password"}
                placeholder='Confirm New Password'
                className='border border-black focus:outline-none px-2 py-1 w-full'
                required
                name='newPassword2'
                value={formData.newPassword2}
                onChange={handleInputChange}
              />
              <div
                onClick={() => togglePasswordVisibility('newPassword2')}
                className='absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer'
                aria-label={showPassword.newPassword2 ? 'Hide password' : 'Show password'}
              >
                {showPassword.newPassword2 ? <Eye className="size-4 bg-white" /> : <EyeClose className="size-4 bg-white" />}
              </div>
            </div>

            <button type="submit" className='bg-black text-white w-full py-2 border border-black hover:bg-white hover:text-black'>Change Password</button>
          </div>
        </div>
      </form>
      <Footer />
    </section>
  );
};

export default ChangePassword;