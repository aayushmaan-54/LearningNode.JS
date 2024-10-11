import React from 'react';
import { AuthLogo } from '../assets/SVG';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 w-full">
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            MERN Stack Authentication System
          </h1>
          <p className="text-lg text-gray-600">
            Authentication app that allows you to log in using options like "Remember Me," an access code, or Google login. It includes features for signing up, account verification, and resetting passwords if you forget them. Once logged in, users are redirected to their profile page, and an admin user list page is also available for easy user management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/sign-up"
              className="px-6 py-3 bg-black text-white font-semibold hover:bg-transparent hover:text-black border border-black transition duration-300 ease-in-out text-center"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 bg-white text-black font-semibold hover:bg-black transition duration-300 ease-in-out border border-black text-center hover:text-white"
            >
              Log In
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <AuthLogo className="w-64 h-64 md:w-80 md:h-80 transform hover:scale-105 transition duration-300 ease-in-out" />
        </div>
      </div>
    </main>
  );
}

export default Hero;