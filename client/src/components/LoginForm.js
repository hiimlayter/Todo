import React from 'react'

function LoginForm({handleChangePassword,handleChangeUsername,login,error}) {
  return (
    <>
    <h2 style={{color: "white", padding:"0 0 15px 0", textDecoration: "underline"}}>Logowanie</h2>
    <div style={{color: "white"}}>
        <form>
          <div className='form-login'>
          <div className='div-login'>
          <div className='label-login'>Nazwa użytkownika:</div>
          <input className='input-login' type='text' name='username' onChange={handleChangeUsername}/>
          </div>
          <div className='div-login'>
          <div className='label-login'>Hasło:</div>
          <input className='input-login' type='password' name='password' onChange={handleChangePassword}/>
          </div>
          </div>
          <div className='error-log'>{error}</div>
          <button className='login-btn' onClick={(e) => {
            e.preventDefault();
            login();
          }
          }>Login</button>
        </form>
      </div>
      </>
  )
}

export default LoginForm