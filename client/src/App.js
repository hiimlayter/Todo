import React from 'react'
import {useState} from 'react'
import './App.css';
import LoginForm from './components/LoginForm';
import TodoList from './components/TodoList';
import RegisterForm from './components/RegisterForm';

function App(){
  
  const [user, setUser] = useState(sessionStorage.getItem('user')===null?'':sessionStorage.getItem('user'));
  const [userID, setUserID] = useState(sessionStorage.getItem('userID')===null?'':sessionStorage.getItem('userID'));
  
  const [error, setError] = useState('');
  const [regerror, setRegerror] = useState('');

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
          setError('');
          sessionStorage.setItem('user', data.user);
          sessionStorage.setItem('userID', data.id);
        }
        else{
          setError(data.error);
        }
      }
    )
  }
  const register = () => {
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'username': username, 'password': password})
    };
    fetch('/register', requestOptions).then(
      res => res.json()
    ).then(
      data => {
        if (data.success) {
          login();
          setRegerror('');
        }
        else{
          setRegerror(data.error);
        }
      }
    )
  }

return (
    <div className='todo-app'>

      {userID===''? (
      <>

      <h1 style={{color: "white", fontSize: "40px"}}>Todo App</h1>
      <LoginForm error={error} setError={setError} handleChangePassword={handleChangePassword} 
      handleChangeUsername={handleChangeUsername} login={login}/>

      <hr className='hr-form'></hr>

      <RegisterForm regerror={regerror} setRegerror={setRegerror} handleChangePassword={handleChangePassword} 
      handleChangeUsername={handleChangeUsername} register={register}/>

      </>
      ) : (
      <TodoList data={passData()} setUser={setUser} setUserID={setUserID}/>
    )}

    </div>
  )
}

export default App