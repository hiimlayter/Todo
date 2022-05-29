import React from 'react'

function LoginForm({handleChangePassword,handleChangeUsername,login,error,setError}) {
  return (
    <>
    <h2 style={{color: "white", padding:"0 0 15px 0", textDecoration: "underline"}}>Logowanie</h2>
    <div style={{color: "white"}}>
        <form>
          <div className='form-login'>
          <div className='div-login'>
          <div className='label-login'>Nazwa użytkownika:</div>
          <input className='input-login' type='text' name='username' id='nazwa' onChange={handleChangeUsername}/>
          </div>
          <div className='div-login'>
          <div className='label-login'>Hasło:</div>
          <input className='input-login' type='password' name='password' id='pass' onChange={handleChangePassword}/>
          </div>
          </div>
          <button className='login-btn' onClick={(e) => {
            e.preventDefault();
            let emptyNameOrPass = document.getElementById('pass').value !== '' && document.getElementById('nazwa').value !== '';
            if(emptyNameOrPass){
                login();
            }
            else{
                setError("Nie wypełniono wszystkich pól");
            }
          }
          }>Zaloguj</button>
          <div className='error-log'>{error}</div>
        </form>
      </div>
      </>
  )
}

export default LoginForm