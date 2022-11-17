import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || "3001"}`,
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestAuth = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const getBalance = async (endpoint) => {
  const { data } = await api.get(endpoint)
  return data
}
