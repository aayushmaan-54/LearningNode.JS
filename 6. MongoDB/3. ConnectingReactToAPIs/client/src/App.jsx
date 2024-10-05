import React, { useEffect, useRef, useState } from 'react';
import { TodoContext } from './context/todoContext';
import HomePage from './pages/HomePage';
import './App.css';
import { getTodos } from './utils/api';
import Loader from './components/Loader';


function App() {

  const [todoList, setTodoList] = useState([]);
  const [isTodoComplete, setIsTodoComplete] = useState(false);
  const [isTodoEdit, setIsTodoEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const todoInputRef = useRef(null);


  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const todos = await getTodos();
        setTodoList(todos);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching todos:", error);
        setIsLoading(false);
      }
    }
    fetchTodos();
  }, []);


  return (
    <>
      <TodoContext.Provider value={{ todoList, setTodoList, isTodoComplete, setIsTodoComplete, isTodoEdit, setIsTodoEdit, isLoading, setIsLoading, todoInputRef }}>
        <HomePage />
        { isLoading ? <Loader /> : '' } 
      </TodoContext.Provider>
    </>
  );
}


export default App;
