import React from 'react';
import { Navigate} from 'react-router-dom';


export const ProtectedRoute = ({ component }) => {
  const token = localStorage.getItem('token');
  return (
    !token ? component : <Navigate to='/todo' {...alert("잘못된 접근입니다.")} />
  )
};

export const PrivateRoute = ({ component }) => {
  const token = localStorage.getItem('token');
  return (
    token ? component : <Navigate to='/signin' {...alert("로그인 후 이용해주세요.")} />
  )
};

