import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/todos',
});

export async function getTodos() {
  const res = await apiClient.get();
  return res.data;
}