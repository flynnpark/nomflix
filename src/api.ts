import Axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: process.env.API_KEY,
    language: 'en-US'
  }
});

export default api;
