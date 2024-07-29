import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
});

export const searchUsers = async (query: string, page: number) => {
  const response = await api.get(
    `/search/users?q=${query}&page=${page}&per_page=15`
  );
  return response.data;
};

export const getUserDetails = async (username: string) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};
