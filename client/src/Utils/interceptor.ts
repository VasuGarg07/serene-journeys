import axios from "axios";
import { StorageHelper } from "./storage.helper";

const http = axios.create();

http.interceptors.request.use(
  config => {
    const token = StorageHelper.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    // Handle successful responses
    return response;
  },
  error => {
    // Unauthorized Call
    if (error.response.status == 401) {
      StorageHelper.clearStorage();
    }

    // Optionally, you can reject the promise to propagate the error
    return Promise.reject(error);
  }
);

export default http;