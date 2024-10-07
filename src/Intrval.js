import React, { useState, useEffect } from 'react';
import "./In.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "react-datepicker/dist/react-datepicker.css";

const getLocalItems=()=>{
  var list = localStorage.getItem('lists')
  if(list){
      return  JSON.parse(localStorage.getItem('lists'))
  }else{
      return []
  }
  }
function Intrval() {
  const [todos, setTodos] = useState(getLocalItems());  // State to store the todo list
  const [inputValue, setInputValue] = useState('');  // State to track the input value
  const [date, setDate] = useState(new Date());

  // handle local storage
  useEffect(()=>{
    localStorage.setItem("list" , JSON.stringify(todos))
        },[todos])
    
  
// handleDate
const handleDate=(date)=>{
  setDate(date)
  window.location.reload()

}
  // Handle input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Add a new todo with a timer starting from 0
  const addTodo = () => {
    if (inputValue.trim() === '') return; // Prevent empty todos

    const newTodo = {
      id: Date.now(), // Unique ID
      text: inputValue,
      timeElapsed: 0, // Timer starts at 0
      isPaused: true, // Timer starts in the running state
    };

    setTodos([...todos, newTodo]);
    setInputValue(''); // Reset the input field
  };

  // Toggle the pause/resume state for a todo
  const togglePause = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isPaused: !todo.isPaused } : todo
      )
    );
  };

  // Handle time count-up for each todo (only if not paused)
  useEffect(() => {
    const interval = setInterval(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          !todo.isPaused
            ? { ...todo, timeElapsed: todo.timeElapsed + 1 } // Increase the timer if not paused
            : todo
        )
      );
    }, 1000); // Increase every second

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <>
    <div style={{textAlign:"center"}}>
  <DatePicker  selected={date} onChange={handleDate} />
    </div>
    <div className='todo-1'>
      {/* <h1>Todo List with Infinite Timers</h1> */}

      {/* Input and Add Button */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={addTodo}>Add Todo</button>

      {/* Display Todos with Timers and Stop/Start Buttons */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className='todo-4'>
              <h3>{todo.timeElapsed}</h3>
              <h3>{todo.text}</h3>
              <button onClick={() => togglePause(todo.id)}>
              {todo.isPaused ? 'Start' : 'Stop'} Timer
            </button>
              </div>
            
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default Intrval;
