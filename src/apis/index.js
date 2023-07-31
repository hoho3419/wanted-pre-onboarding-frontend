import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://www.pre-onboarding-selection-task.shop',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userSignup = async (email,password) => {
  try {
    const data = await apiClient.post('/auth/signup',{email,password});
    return data;
  }catch(error){
    console.log(error.message);
    throw new Error(error.response.data.message);
  }
};

export const userSignin = async (email,password) => {
  try {
    const data = await apiClient.post('/auth/signin',{email,password});
    return data;
  }catch(error){
    console.log(error.message);
    throw new Error(error.response.data.message);
  }
};

export const getTodos = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiClient.get('/todos',{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  }catch(error){
    console.log(error.message);
    throw new Error(error.response.data.message);
  }
};

export const createTodo = async (todo) => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiClient.post('/todos',{todo},{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    return response.data;
  }catch(error){
    console.log(error.message);
    throw new Error(error.response.data.message);
  }
};

export const updateTodo = async (id,upTodoTxt,upIsCompleted) => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiClient.put('/todos/' + id,{todo: upTodoTxt,isCompleted: upIsCompleted},{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    return response.data;
  }catch(error){
    console.log(error.message);
    throw new Error(error.response.data.message);
  }
};

export const deleteTodo = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiClient.delete('/todos/' + id,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  }catch(error){
    console.log(error.message);
    throw new Error(error.response.data.message);
  }
};