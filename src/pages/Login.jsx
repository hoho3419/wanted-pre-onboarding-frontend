import React, { useState } from 'react';
import useInput from '../hooks/useInput';
import { AuthBox, FormBox} from './Register'
import { emailValidate,passwordValidate } from '../utils/auth';
import { userSignin } from '../apis';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [error,setError] = useState('');
  const { 
    value: enterdEmail,
    valueIsValid: enterdEmailIsValid,
    valueChangeHandler: emailChangeHandler,
    reset: resetEmailInput,
   } = useInput(emailValidate);
   
  const { 
    value: enterdPassword,
    valueIsValid: enterdPasswordIsValid,
    valueChangeHandler: passwordChangeHandler,
    reset: resetpasswordInput,
  } = useInput(passwordValidate);

  const submitHandler = async (event) => {
    event.preventDefault();
    if(enterdEmailIsValid && enterdPasswordIsValid){
      try{
        const response = await userSignin(enterdEmail,enterdPassword);
        localStorage.setItem('token',response.data.access_token)
        resetEmailInput();
        resetpasswordInput();
        navigate('/todo');
      }catch(error){
        resetEmailInput();
        setError(error.message);
      }
    }
  }
  return (
    <AuthBox>
      <h1>로그인 페이지</h1>
      <FormBox onSubmit={submitHandler}>
        <label>아이디</label>
        <input 
          type='text'
          data-testid="email-input"
          placeholder='이메일'
          value={enterdEmail}
          onChange={emailChangeHandler}  
          onFocus={() => setError('')}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <label>패스워드</label>
        <input 
          type='password'
          data-testid="password-input"
          placeholder='패스워드'
          style={{marginBottom: '50px'}}
          value={enterdPassword}
          onChange={passwordChangeHandler}
        />
        <button 
          data-testid="signin-button"
          disabled={!enterdEmailIsValid || !enterdPasswordIsValid}
        >
          로그인
        </button>
      </FormBox>
    </AuthBox>
  );
};

export default Login;