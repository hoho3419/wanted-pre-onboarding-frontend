import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const Header = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    navigate('/');
  }

  return (
    <HeaderNav>
      <Link to={'/'}>Home</Link>
      <Link to={'/todo'}>Todos</Link>
      <Link to={'/signin'}>Login</Link>
      <Link to={'/signup'}>Register</Link>
      <button onClick={logoutHandler}>Logout</button>
    </HeaderNav>
  );
};

export default Header;

const HeaderNav = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 70px;
  border-bottom: 1px solid #aaa;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  a {
    text-decoration: none;
    outline: none;
    color: white;
    padding: 1rem;
    &:hover {
      color: darkgray;
    }
  }
  button{
    color: white;
    background-color: transparent;
    border: none;
    padding: 1rem;
    font-size: 1.1rem;
    cursor: pointer;
    &:hover {
      color: darkgray;
    }
  }
`;