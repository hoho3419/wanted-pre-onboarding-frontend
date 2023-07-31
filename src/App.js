import { Routes, Route } from 'react-router-dom';
import { Home,Login,Register,Todos } from './pages';
import { styled } from 'styled-components';
import { Header } from './components'
import { PrivateRoute,ProtectedRoute } from './route';

function App() {
  return (
    <Container>
      <Header/>
      <Routes >
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<ProtectedRoute component={<Login/>}/> }/>
        <Route path='/signup' element={<ProtectedRoute component={<Register/>}/> }/>
        <Route path='/todo' element={<PrivateRoute  component={<Todos/>}/> }/>
      </Routes>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100vh;
  margin: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;