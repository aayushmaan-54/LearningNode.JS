import React, { useContext } from 'react';
import { AddCircle, Bin, Clock, Pencil } from '../assets/SVG';
import { TodoContext } from '../context/todoContext';

const TodoList = () => {

  const { todoEdit } = useContext(TodoContext);

  return (
    <div className='px-4 my-4'>
      {!todoEdit ? (
        <>
          <div className='flex justify-between'>
            <div>
              <input type="checkbox" id="todo1" />
              <label htmlFor="todo1" className='ml-2 cursor-pointer'>todo 1</label>
            </div>

            <div className='flex gap-2'>
              <button><Pencil /></button>
              <button><Bin /></button>
            </div>
          </div>

          <div className='flex items-center justify-start mb-1'>
            <Clock />
            <span className='ml-2'>12:00, 24 Oct</span>
          </div>
          <hr />
        </>
      ) : (
        <div className="group w-[95%] h-[40px] flex items-center justify-between bg-[#2d2d2d] px-[15px] rounded-[10px] border border-[#3f3f3f] focus-within:border-[#787878] transition-colors duration-300 mx-auto mt-5">
          <div className="flex-grow flex items-center">
            <div className="w-fit h-full flex items-center justify-center font-arial">
              <label htmlFor="file" className="w-fit h-fit flex items-center justify-center relative">
                <AddCircle />
              </label>
            </div>
            <input
              required
              placeholder="Change ToDo..."
              type="text"
              id="messageInput"
              className="w-full h-full bg-transparent outline-none border-none pl-[10px] text-white font-semibold"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-green-600 text-white rounded-md text-sm font-semibold hover:bg-green-700 transition-colors duration-300">
              Save
            </button>
            <button className="px-3 py-1 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 transition-colors duration-300">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;