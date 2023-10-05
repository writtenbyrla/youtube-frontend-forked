import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/auth/",
});

export const loginAPI = async (id, password) => {
  return await instance.post("signin", { id, password });
};

export const registerAPI = async (id, password, name) => {
  return await instance.post("signup", { id, password, name });
};
