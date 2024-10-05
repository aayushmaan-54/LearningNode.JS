import React, { useContext } from 'react';
import { AddCircle, SendButton } from '../assets/SVG';
import { TodoContext } from '../context/todoContext';
import { getTodos, postTodo } from '../utils/api';


const AddTodo = () => {

  const { todoInputRef, setIsLoading, setTodoList } = useContext(TodoContext);


  const todoInputSubmitHandler = async (e) => {
    e.preventDefault();
    const inputTodo = todoInputRef.current.value;
  
    if (inputTodo.length <= 0) return;
  
    const todo = {
      title: inputTodo,
      isCompleted: false,
      date: Date.now()
    };
  
    try {
      setIsLoading(true);
      await postTodo(todo);
      todoInputRef.current.value = '';
      setTodoList(await getTodos());
    } catch (error) {
      console.error('Failed to post todo:', error);
    } finally {
      setIsLoading(false);
    }
  }

  
  return (
    <form onSubmit={todoInputSubmitHandler}>
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
          ref={todoInputRef}
        />
        <button id="sendButton" className="w-fit h-full bg-transparent outline-none border-none flex items-center justify-center cursor-pointer transition-all duration-300" type="submit">
          <SendButton />
        </button>
      </div>
    </form>

  );
}

export default AddTodo;