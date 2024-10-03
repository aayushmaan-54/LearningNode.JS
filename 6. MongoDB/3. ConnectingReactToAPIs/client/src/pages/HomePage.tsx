import React, { useContext } from 'react';
import { TodoContext } from '../context/todoContext';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

const HomePage = () => {
  return (
    <>
      <main className='absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
        <div className='absolute inset-0 h-full w-full bg-transparent bg-[radial-gradient(#434445_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] z-[-2]'></div>
        <div className='flex flex-col items-center'>
          <h1 className='text-white font-bold text-5xl my-7'>T0D0's</h1>
          <article className='bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-[#787878] w-[90vw] sm:w-[60vw] lg:w-[40vw]'>
            <AddTodo />
            <TodoList />
          </article>
        </div>
      </main>
    </>
  );
}

export default HomePage;