import React, { useState } from 'react';
import { styled } from 'styled-components';
import useInput from '../hooks/useInput';
import { emailValidate,passwordValidate } from '../utils/auth';
import { userSignup } from '../apis';
import {  useNavigate } from 'react-router-dom';

const Register = () => {
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
        await userSignup(enterdEmail,enterdPassword);
        resetEmailInput();
        resetpasswordInput();
        navigate('/signin');
      }catch(error){
        resetEmailInput();
        setError(error.message)
      }
    }
  }
  return (
    <AuthBox>
      <h1>회원가입 페이지</h1>
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
          data-testid="signup-button"
          disabled={!enterdEmailIsValid || !enterdPasswordIsValid}
        >
          회원가입
        </button>
      </FormBox>
    </AuthBox>
  );
};

export default Register;

export const AuthBox = styled.div`
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.1);
  padding: 1rem;
  box-sizing: border-box;
  h1{
    text-align: center;
    color: white;
  }
`;

export const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  outline: none;
  label {
    color: white;
    font-size: 20px;
  }
  input{
    height: 30px;
    font-size: 1rem;
  }
  button {
    width: 80%;
    margin: auto;
    font-size: 1.7rem;
    border-radius: 20px;
    height: 50px;
    cursor: pointer;
    &:disabled{
      cursor: not-allowed;
    }
  }
`;