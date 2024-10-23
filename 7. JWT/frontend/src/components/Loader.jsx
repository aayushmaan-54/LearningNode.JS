import React from 'react';
import '../index.css';


const Loader = () => {
  return (
    <aside className='flex items-center justify-center w-screen h-screen fixed inset-0 z-50'>
      <div className="loader w-[50px] aspect-square rounded-full border-8 border-solid border-black z-50"></div>
      <div className="absolute inset-0 w-screen h-screen bg-black bg-opacity-30 z-40"></div>
    </aside>
  );
}

export default Loader;