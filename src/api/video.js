import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const getCategories = async () => {
  return await instance.get("category");
};

export const addVideo = async (data) => {
  return await instance.post("video", data);
};

export const getVideos = async (page, category) => {
  let url = `video?page=${page}`;
  if (category !== null) {
    url += `&category=${category}`;
  }
  return await instance.get(url);
};
