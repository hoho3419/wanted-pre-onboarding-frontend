import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { getTodos } from '../apis';
import { TodoForm,TodoItem} from '../components';

const Todos = () => {
  const [todos,setTodos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try{
        const data = await getTodos();
        setTodos(data);
      }catch(error){
        console.log(error);
      }
    }
    fetchData();
  },[])

  return (
    <TodoBox>
      <h1>Todo List 페이지</h1>
      <TodoForm AddTodo={setTodos}/>
      <TodoList>
        {todos.map(({id,todo,isCompleted}) => (
          <TodoItem 
            key={id}
            id={id}
            todo={todo}
            isCompleted={isCompleted}
            setTodos={setTodos}
          />
        ))}
      </TodoList>
    </TodoBox>
  );
};

export default Todos;

const TodoBox = styled.div`
  width: 100%;
  min-height: 400px;
  height: auto;
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

const TodoList = styled.ul`
  display: flex;
  flex-direction: column;
`;