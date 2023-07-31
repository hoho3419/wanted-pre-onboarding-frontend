import React, { useRef } from 'react';
import { styled } from 'styled-components';
import { createTodo } from '../../apis';

const TodoForm = ({ AddTodo }) => {
  const Todo = useRef('');

  const submitHandler = (event) => {
    event.preventDefault();
    const Todoadd = async () => {
      try{
        const TodoData = await createTodo(Todo.current.value);
        AddTodo((prev) => [...prev,TodoData]);
      }catch(error){
        console.log(error.message);
      }
    }
    Todoadd();
  }

  return (
    <TodoFormBox onSubmit={submitHandler}>
      <input type='text' data-testid="new-todo-input" ref={Todo}/>
      <button data-testid="new-todo-add-button">추가</button>
    </TodoFormBox>
  );
};

export default TodoForm;

const TodoFormBox = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  input{
    width: 10rem;
    height: 1.5rem;
    border-radius: 20px;
    padding: 1rem;
    box-sizing: border-box;
  }
  button{
    width: 4rem;
    height: 2rem;
    border-radius: 10px;
    box-sizing: border-box;
  }
`;