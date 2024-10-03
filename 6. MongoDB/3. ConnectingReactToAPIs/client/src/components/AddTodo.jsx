import React from 'react';
import { AddCircle, SendButton } from '../assets/SVG';


const AddTodo = () => {

  return (
      <div className="group w-[95%] h-[40px] flex items-center justify-center bg-[#2d2d2d] px-[15px] rounded-[10px] border border-[#3f3f3f] focus-within:border-[#787878] transition-colors duration-300 mx-auto mt-5">
        <div className="w-fit h-full flex items-center justify-center font-arial">
          <label htmlFor="file" className="w-fit h-fit flex items-center justify-center relative">
            <AddCircle />
          </label>
        </div>
        <input
          required
          placeholder="Enter ToDo..."
          type="text"
          id="messageInput"
          className="w-full h-full bg-transparent outline-none border-none pl-[10px] text-white font-semibold"
        />
        <button id="sendButton" className="w-fit h-full bg-transparent outline-none border-none flex items-center justify-center cursor-pointer transition-all duration-300">
          <SendButton />
        </button>
      </div>
  );
}

export default AddTodo;