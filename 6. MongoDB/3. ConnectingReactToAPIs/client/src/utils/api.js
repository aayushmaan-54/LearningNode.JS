import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/todos`,
});


export async function getTodos() {
  try {
    const res = await apiClient.get();
    return res.data;
  } catch (error) {
    console.error('Error Getting todo: ', error);
    throw error;
  }
}

export async function postTodo(todo) {
  try {
    const res = await apiClient.post('', todo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error posting todo: ', error);
    throw error;
  }
}


export async function patchTodo(todo, id) {
  try {
    const res = await apiClient.patch(`/${id}`, todo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error patching todo: ', error);
    throw error;
  }
}


export async function deleteTodo(id) {
  try {
    const res = await apiClient.delete(`/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error deleting todo: ', error);
    throw error;
  }
}