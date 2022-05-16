import axios from "axios";
import { localstorage } from "@storage";

const defaultOptions = {
  baseURL: `${process.env.ADMIN_BASE_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

export const instance = axios.create(defaultOptions);

instance.interceptors.request.use((config) => {
  const token = localstorage.getAccessToken();
  const { headers } = config;
  if (!headers) {
    config.headers = { Authorization: `Bearer ${token}` };
  } else if (!headers["Authorization"]) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use((response) => {
  const { status } = response;
  if (status === 200 || status === 201) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
});
