import React from 'react'
import {useState} from 'react'
import './App.css';
import LoginForm from './components/LoginForm';
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

      {userID===''? (
      <>
      <h1 style={{color: "white", fontSize: "45px"}}>Todo App</h1>
      <LoginForm error={error} handleChangePassword={handleChangePassword} handleChangeUsername={handleChangeUsername} login={login}/>
      </>
      ) : (
      <TodoList data={passData()} logout={logout}/>
    )}

    </div>
  )
}

export default App