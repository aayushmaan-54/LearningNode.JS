import React, { useEffect, useState } from 'react';
import { AuthLogo, Profile } from '../assets/SVG';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, logout, RESET, getUserProfile } from '../redux/features/auth/authSlice';


const Header = () => {
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);

  const { loginStatus, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const popoverClickHandler = () => {
    setIsPopOverOpen(!isPopOverOpen);
  }

  const logoutUser = async () => {
    await dispatch(RESET());
    await dispatch(logout());
    await dispatch(isUserLoggedIn());
    navigate('/login');
  }

  useEffect(() => {
    dispatch(isUserLoggedIn());
    dispatch(getUserProfile());
  }, []);

  return (
    <>
      <header className='flex items-center justify-between mx-3 my-2 pb-3 border-b-2 border-black'>

        <Link className='flex items-center justify-start hover:opacity-90' to={'/'}>
          <AuthLogo className="size-9" />
          <span className='ml-2 pixelMonoFont text-4xl'>://AuthN</span>
        </Link>

        <nav className='flex items-center gap-1'>
          { loginStatus && (
            <>
              <div className='flex items-center relative cursor-pointer' onClick={popoverClickHandler}>
                <Profile className='size-8' />
                <span className='ml-2 text-ellipsis max-w-[12ch] overflow-hidden whitespace-nowrap'>Hi, { user?.name }</span>

                {
                  isPopOverOpen && 
                  <div className='border border-black flex flex-col items-center justify-center px-3 py-2 absolute top-[100%] right-[20%] w-[200px] bg-white'>
                    <Link className='flex items-centers flex-col justify-center' to={'/profile'}>
                      <Profile className='size-11 mx-auto' />
                      <h3>{ user?.name }</h3>
                    </Link>
                    <Link className='mt-3 border-t-black mb-2 hover:underline text decoration-2 underline-offset-2' to={'/profile'}>Profile</Link>
                    <Link className='border border-black px-4 py-1 bg-black text-white hover:border hover:text-black hover:bg-transparent' onClick={logoutUser}>LogOut</Link>
                  </div>
                }
              </div>
            </>
          )}
          <div className='flex items-center gap-4'>
            {
              (!loginStatus) &&
              <Link href="" className='border px-4 py-1 border-black hover:bg-black hover:text-white' to={'/login'}>LogIn</Link>
            }
          </div>
        </nav>

      </header>
    </>
  );
}

export default Header;