import axios from 'axios';

export const apiRoot = 'http://localhost:3000';

export const client = axios.create({
  baseURL: apiRoot,
  timeout: 30000,
});

//request interceptor
client.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

//response interceptor
client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
