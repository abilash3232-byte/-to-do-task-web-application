import axios from "axios";

const API_URL = "http://localhost:5000"; // backend URL

export const createTask = (task) =>
  axios.post(`${API_URL}/tasks`, task);

export const getTasks = () =>
  axios.get(`${API_URL}/tasks`);

export const markTaskDone = (id) =>
  axios.put(`${API_URL}/tasks/${id}/complete`);

export const getAllTasks = () =>
  axios.get(`${API_URL}/tasks/all`);

export const getCompletedTasks = () =>
  axios.get(`${API_URL}/tasks/completed`);
