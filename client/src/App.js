import React from 'react'
import {useState} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';

function App(){
  const [user, setUser] = useState('Mateusz');
  const [token, setToken] = useState('');
  const [auth, setAuth] = useState(false);

  function validate(token){
    return auth;
  }

  function authenticate(){
    setAuth(!auth);
  }

return (
    <div className='todo-app'>

      {!validate(token)? (
      <div style={{color: "white"}}>
        <h1>Todo App</h1>
        <button onClick={authenticate}> Loguj </button>
      </div>
      ) : (
      <TodoList user={user}/>
    )}

    </div>
  )
}

export default App