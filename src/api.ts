import Axios, { AxiosInstance, AxiosPromise } from 'axios';

const API: AxiosInstance = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: process.env.API_KEY,
    language: 'en-US'
  }
});

interface IMoviesAPI {
  nowPlaying: () => AxiosPromise<any>;
  upcoming: () => AxiosPromise<any>;
  popular: () => AxiosPromise<any>;
}

export const moviesAPI: IMoviesAPI = {
  nowPlaying: () => API.get('movie/now_playing'),
  upcoming: () => API.get('movie/upcoming'),
  popular: () => API.get('movie/popular')
};

interface ITvAPI {
  topRated: () => AxiosPromise<any>;
  popular: () => AxiosPromise<any>;
  airingToday: () => AxiosPromise<any>;
}

export const tvAPI: ITvAPI = {
  topRated: () => API.get('tv/top_rated'),
  popular: () => API.get('tv/popular'),
  airingToday: () => API.get('tv/airing_today')
};
