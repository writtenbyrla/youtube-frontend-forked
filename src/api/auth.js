import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/auth/",
});

export const loginAPI = async (data) => {
  return await instance.post("signin", data);
};

export const registerAPI = async (data) => {
  console.log("api call!");
  console.log(data);
  return await instance.post("signup", data);
};
