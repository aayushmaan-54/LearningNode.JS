import React, { useState } from 'react';
import { AuthLogo, Profile } from '../assets/SVG';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);

  const popoverClickHandler = () => {
    setIsPopOverOpen(!isPopOverOpen);
  }

  return (
    <>
      <header className='flex items-center justify-between mx-3 my-2 pb-3 border-b-2 border-black'>

        <Link className='flex items-center justify-start hover:opacity-90' to={'/'}>
          <AuthLogo className="size-9" />
          <span className='ml-2 pixelMonoFont text-4xl'>://AuthN</span>
        </Link>

        <nav className='flex items-center gap-1'>
          {isUserLoggedIn && (
            <>
              <div className='flex items-center relative cursor-pointer' onClick={popoverClickHandler}>
                <Profile className='size-8' />
                <span className='ml-2 text-ellipsis max-w-[12ch] overflow-hidden whitespace-nowrap'>Hi, Aayushmaan</span>

                {
                  isPopOverOpen && 
                  <div className='border border-black flex flex-col items-center justify-center px-3 py-2 absolute top-[100%] right-[20%] w-[200px] bg-white'>
                    <div className='flex items-centers flex-col justify-center'>
                      <Profile className='size-11 mx-auto' />
                      <h3>Aayushmaan Soni</h3>
                    </div>
                    <Link className='mt-3 border-t-black mb-2 hover:underline text decoration-2 underline-offset-2'>Profile</Link>
                    <Link className='border border-black px-4 py-1 bg-black text-white hover:border hover:text-black hover:bg-transparent'>LogOut</Link>
                  </div>
                }
              </div>
            </>
          )}
          <div className='flex items-center gap-4'>
            {
              (!isUserLoggedIn) &&
              <Link href="" className='border px-4 py-1 border-black hover:bg-black hover:text-white' to={'/login'}>LogIn</Link>
            }
          </div>
        </nav>

      </header>
    </>
  );
}

export default Header;