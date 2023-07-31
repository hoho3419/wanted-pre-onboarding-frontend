import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { deleteTodo, updateTodo } from '../../apis';

const TodoItem = ({ id,todo, isCompleted,setTodos }) => {
  const [checkBox, setCheckBox] = useState(isCompleted);
  const [todoText, setTodoText] = useState(todo);
  const [inputToggle, setInputToggle] = useState(false);

  useEffect(() => {
    setTodoText(todo);
  },[inputToggle,todo,setTodoText])

  const deleteHandler = async () => {
    try{
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    }catch(error){
      console.log(error.message);
    }
  }
  const updateHandler = async () => {
    try{
      const { todo,isCompleted } =  await updateTodo(id,todoText,checkBox);
      setTodos((prevTodos) => {
        // 업데이트된 데이터로 새로운 배열 생성
        const updatedTodos = prevTodos.map((todoItem) =>
          todoItem.id === id ? { ...todoItem, todo: todoText, isCompleted: checkBox } : todoItem
        );
        // 기존 데이터 찾기
        const existingTodo = prevTodos.find((todoItem) => todoItem.id === id);
        // 기존 데이터가 있으면 새로운 데이터로 변경하고, 없으면 기존 데이터를 그대로 유지
        const finalTodos = existingTodo ? updatedTodos : [...prevTodos, { id, todo: todo, isCompleted: isCompleted }];
        return finalTodos;
      });
      setInputToggle(!inputToggle);
    }catch(error){
      console.log(error.message);
    }
  }

  return (
    <ItemBox>
      <label>
        <input type="checkbox" checked={checkBox} onChange={() => setCheckBox(!checkBox)} />
        {
          inputToggle ? (
            <>
              <input type="text" data-testid="modify-input" value={todoText} onChange={(e) => setTodoText(e.target.value)} />
              <button data-testid="submit-button" onClick={updateHandler}>제출</button>
              <button data-testid="cancel-button" onClick={() => setInputToggle(!inputToggle)}>취소</button>
            </>
            ) 
            : 
            (
              <>
                <span>{todo}</span>
                <button data-testid="modify-button" onClick={() => setInputToggle(!inputToggle)}>수정</button>
                <button data-testid="delete-button" onClick={deleteHandler}>삭제</button>
              </>
            )
        }
      </label>
    </ItemBox>
  );
};

export default TodoItem;

const ItemBox = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  margin-bottom: 2rem;
  font-size: 1.3rem;
  label{
    display: flex;
    gap: .5rem;
    align-items: center;
    color: white;
  }
  input[type=checkbox]{
    width: 1.5rem;
    height: 1.5rem;
  }
  input[type=text]{
    width: 10rem;
    height: 1.5rem;
    padding: 1rem;
    box-sizing: border-box;
    font-size: 1.3rem;
  }

  button {
    width: 4rem;
    font-size: 1.3rem;
    border-radius: 10px;
    margin-left: .5rem;
  }
`;