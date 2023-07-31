import React from 'react';
import { styled } from 'styled-components';

const Home = () => {
  return (
    <HomeBox>
      <h1>메인 페이지 입니다.</h1>
      <span>HOME</span>
    </HomeBox>
  );
};

export default Home;

const HomeBox = styled.div`
  width: 100%;
  min-height: 400px;
  box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;