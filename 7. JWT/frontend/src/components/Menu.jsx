import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/features/auth/authSlice';


const Menu = () => {
  const user = useSelector(selectUser);

  return (
    <>
      <div className='flex items-center justify-around border border-black list-none py-2 px-2 text-xs w-[90vw] mt-5 mb-3 sm:w-[500px] sm:text-base'>
        <li><NavLink to={'/profile'} className={({ isActive }) =>
          isActive
            ? "underline underline-offset-2 hover:opacity-90"
            : "hover:opacity-90"
        }>Profile</NavLink></li>
        <li><NavLink to={'/change-password'} className={({ isActive }) =>
          isActive
            ? "underline underline-offset-2 hover:opacity-90"
            : "hover:opacity-90"
        }>Change Password</NavLink></li>
        {
          user?.role === 'admin' ?
            <li><NavLink to={'/users'} className={({ isActive }) =>
              isActive
                ? "underline underline-offset-2 hover:opacity-90"
                : "hover:opacity-90"
            }>Users</NavLink></li>
            :
            ""
        }
      </div>
    </>
  );
}

export default Menu;