import React from 'react';


const Loader = () => {
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
      <div className="relative">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-[#7877c6]"></div>
      </div>
    </div>
  );
};


export default Loader;