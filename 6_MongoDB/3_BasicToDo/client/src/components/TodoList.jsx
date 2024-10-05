import React, { useContext, useState } from 'react';
import { Bin, Clock, Pencil } from '../assets/SVG';
import { TodoContext } from '../context/todoContext';
import { deleteTodo, patchTodo } from '../utils/api';


const TodoList = () => {

  const { todoList, setIsLoading, setTodoList } = useContext(TodoContext);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEditClick = (todo) => {
    setEditTodoId(todo._id);
    setEditText(todo.title);
  };


  const handleCancelEdit = () => {
    setEditTodoId(null);
    setEditText("");
  };


  const handleSaveEdit = async (todo) => {
    const updatedTodo = { ...todo, title: editText };
    try {
      setIsLoading(true);
      await patchTodo(updatedTodo, todo._id);
      setTodoList((prevTodos) =>
        prevTodos.map((t) =>
          t._id === todo._id ? updatedTodo : t
        )
      );
    } catch (error) {
      console.error("Failed to update todo:", error);
    } finally {
      setIsLoading(false);
      setEditTodoId(null);
    }
  };


  const handleCheckboxChange = async (todo) => {
    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };

    setTodoList((prevTodos) =>
      prevTodos.map((t) =>
        t._id === todo._id ? updatedTodo : t
      )
    );

    try {
      setIsLoading(true);
      await patchTodo(updatedTodo, todo._id);
    } catch (error) {
      console.error("Failed to update todo:", error);
      setTodoList((prevTodos) =>
        prevTodos.map((t) =>
          t._id === todo._id ? todo : t
        )
      );
    } finally {
      setIsLoading(false);
    }
  };


  const handleDeleteClick = async (id) => {
    try {
      setIsLoading(true);
      await deleteTodo(id);
      setTodoList((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    todoList.length <= 0 ? (
      <h1 className='text-2xl font-bold text-center my-8'>No ToDo's Available</h1>
    ) : (
      <div className='px-4 my-4'>
        {todoList.map((todo) => (
          <div key={todo._id} className='mb-4'>
            <div className='flex justify-between'>
              <div className='flex items-center w-full'>
                <input
                  type="checkbox"
                  id={todo._id}
                  className="peer accent-black"
                  checked={todo.isCompleted}
                  onChange={() => handleCheckboxChange(todo)}
                />
                {editTodoId === todo._id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="ml-2 p-1 outline-none bg-[#2d2d2d] px-[15px] rounded-[10px] border border-[#3f3f3f] focus-within:border-[#787878] transition-colors duration-300 mb-2 w-full mr-2"
                    autoFocus
                  />
                ) : (
                  <label
                    htmlFor={todo._id}
                    className={`ml-2 cursor-pointer font-bold text-justify ${todo.isCompleted ? 'line-through' : ''}`}
                  >
                    {todo.title}
                  </label>
                )}
              </div>

              <div className='flex gap-2'>
                {editTodoId === todo._id ? (
                  <>
                    <button
                      className="px-3 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-bold h-fit py-2"
                      onClick={() => handleSaveEdit(todo)}
                    >
                      Save
                    </button>
                    <button
                      className="px-3 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-bold h-fit py-2"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(todo)}><Pencil /></button>
                    <button onClick={() => handleDeleteClick(todo._id)}><Bin /></button>
                  </>
                )}
              </div>
            </div>

            <div className='flex items-center justify-start mb-1'>
              <Clock />
              <span className='ml-2'>
                {new Date(todo.date).toLocaleString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  day: '2-digit',
                  month: 'short',
                })}
              </span>
            </div>
            <hr />
          </div>
        ))}
      </div>
    )
  );
};


export default TodoList;