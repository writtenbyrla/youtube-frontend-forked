import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const addComment = async (data) => {
  return await instance.post("video/comment", data);
};

export const updateComment = async (data) => {
  return await instance.put("video/comment", data);
};

export const deleteComment = async (id) => {
  return await instance.delete("video/comment/" + id);
};
