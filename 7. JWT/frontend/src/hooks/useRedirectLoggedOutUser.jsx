import React, { useLayoutEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const useRedirectLoggedOutUser = (path) => {
  const { loginStatus } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!loginStatus) {
      toast('Session Expired, Please Login Again!', {
        icon: '⚠️',
      });
      navigate(path);
      return;
    }
  }, [path, loginStatus]);

  return (
    <>

    </>
  )
}

export default useRedirectLoggedOutUser