import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const getUsers = () => api.get("/users").then((res) => res.data.data);

export const getUser = (id) =>
  api.get(`/users/find/${id}`).then((res) => res.data.data.user);

export const updateUser = ({ _id, ...updatedUser }) =>
  api.put(`/users/${_id}`, updatedUser).then((res) => res.data.data.user);
