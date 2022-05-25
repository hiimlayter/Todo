import React from 'react'
import {useState} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';

function App(){
  const [user, setUser] = useState('Mateusz');
  const [userID, setUserID] = useState('');
  
  const [error, setError] = useState('');

  var username = '';
  var password = '';

  const handleChangeUsername = (e) => {
    username = e.target.value;
  }
  const handleChangePassword = (e) => {
    password = e.target.value;
  }

  const passData = () => {
    var data = {'user': user, 'id': userID};
    console.log(data)
    return data;
  }

  const logout = () => {
    setUser('');
    setUserID('');
  }

  const login = () => {
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'username': username, 'password': password})
    };  
    fetch('/login', requestOptions).then(
      res => res.json()
    ).then(
      data => {
        if (data.success) {
          setUser(data.user);
          setUserID(data.id);
        }
        else{
          setError(data.error);
        }
      }
    )
  }

return (
    <div className='todo-app'>

      {userID==''? (
      <div style={{color: "white"}}>
        <h1>Todo App</h1>
        <form>
          <label>Username:</label>
          <input type='text' name='username' onChange={handleChangeUsername}/>
          <label>Password:</label>
          <input type='password' name='password' onChange={handleChangePassword}/>
          <button onClick={(e) => {
            e.preventDefault();
            login();
          }
          }>Login</button>
        </form>
        <div className='error-log'>{error}</div>
      </div>
      ) : (
      <TodoList data={passData()} logout={logout}/>
    )}

    </div>
  )
}

export default App