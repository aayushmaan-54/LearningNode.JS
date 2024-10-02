import React, { useEffect, useState } from 'react';
import { TodoContext } from './context/todoContext';
import HomePage from './pages/HomePage';
import './App.css';
import { getTodos } from './utils/api';

function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
    try {
      const todos = await getTodos();
      setTodoList(todos);
      console.log(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }}
    fetchTodos();
  }, []);

  return (
    <>
      <TodoContext.Provider value={todoList} >
        <HomePage />
      </TodoContext.Provider>
    </>
  );
}

export default App;
