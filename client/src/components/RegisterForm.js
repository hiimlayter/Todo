import React from 'react'

function RegisterForm({handleChangePassword,handleChangeUsername,register,regerror,setRegerror}) {
  return (
    <>
    <h2 style={{color: "white", padding:"0 0 15px 0", textDecoration: "underline"}}>Rejestracja</h2>
    <div style={{color: "white"}}>
        <form>
          <div className='form-login'>
          <div className='div-login'>
          <div className='label-login'>Nazwa użytkownika:</div>
          <input className='input-login' type='text' name='username' id='regnazwa' onChange={handleChangeUsername}/>
          </div>
          <div className='div-login'>
          <div className='label-login'>Hasło:</div>
          <input className='input-login' type='password' name='password' id='regpass' onChange={handleChangePassword}/>
          </div>
          <div className='div-login'>
          <div className='label-login'>Powtórz hasło:</div>
          <input className='input-login' type='password' name='password2' id='regpass2'/>
          </div>
          </div>
          <button className='login-btn' onClick={(e) => {
            e.preventDefault();
            let check = document.getElementById('regpass').value === document.getElementById('regpass2').value;
            let emptyNameOrPass = document.getElementById('regpass').value !== '' && document.getElementById('regnazwa').value !== '' && document.getElementById('regpass2').value !== '';
            if(check && emptyNameOrPass){
                register();
            }
            else{
                if(!emptyNameOrPass){
                    setRegerror("Nie wypełniono wszystkich pól");
                }
                else{
                    setRegerror("Hasła nie są takie same");
                }
            }
          }
          }>Zarejestruj</button>
          <div className='error-log'>{regerror}</div>
        </form>
      </div>
      </>
  )
}

export default RegisterForm