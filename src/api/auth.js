import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/auth/",
});

export const login = async (id, password) => {
  await instance.post("signin", { id, password });
};

export const register = async (id, password, name) => {
  await instance.post("signup", { id, password, name });
};
