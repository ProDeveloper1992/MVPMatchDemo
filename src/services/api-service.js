import axios from 'axios';

export const apiRoot = 'https://online-movie-database.p.rapidapi.com';

export const client = axios.create({
  baseURL: apiRoot,
  timeout: 30000,
  headers: {
    'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
    'X-RapidAPI-Key': '59f221dd81msh35025a42347b132p14f3b6jsnfbdd6191d637',
  },
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
    console.log('API response...', response);
    return response;
  },
  function (error) {
    console.log('API error...', error);
    return Promise.reject(error);
  },
);
