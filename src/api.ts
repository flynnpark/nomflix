import Axios, { AxiosInstance, AxiosPromise } from 'axios';

const API: AxiosInstance = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
    language: 'en-US'
  }
});

interface IMoviesAPI {
  nowPlaying: () => AxiosPromise<APIResult.MovieListData>;
  upcoming: () => AxiosPromise<APIResult.MovieListData>;
  popular: () => AxiosPromise<APIResult.MovieListData>;
  movieDetail: (id: number) => AxiosPromise<APIResult.MovieDetail>;
  search: (term: string) => AxiosPromise<APIResult.MovieListData>;
}

export const moviesAPI: IMoviesAPI = {
  nowPlaying: () => API.get('movie/now_playing'),
  upcoming: () => API.get('movie/upcoming'),
  popular: () => API.get('movie/popular'),
  movieDetail: (id: number) =>
    API.get(`movie/${id}`, {
      params: {
        append_to_response: 'videos'
      }
    }),
  search: (term: string) =>
    API.get('search/movie', {
      params: {
        query: encodeURIComponent(term)
      }
    })
};

interface ITvAPI {
  topRated: () => AxiosPromise<APIResult.TvListData>;
  popular: () => AxiosPromise<APIResult.TvListData>;
  airingToday: () => AxiosPromise<APIResult.TvListData>;
  showDetail: (id: number) => AxiosPromise<APIResult.TvDetail>;
  search: (string: string) => AxiosPromise<APIResult.TvListData>;
}

export const tvAPI: ITvAPI = {
  topRated: () => API.get('tv/top_rated'),
  popular: () => API.get('tv/popular'),
  airingToday: () => API.get('tv/airing_today'),
  showDetail: (id: number) =>
    API.get(`tv/${id}`, {
      params: {
        append_to_response: 'videos'
      }
    }),
  search: (term: string) =>
    API.get('search/tv', {
      params: {
        query: encodeURIComponent(term)
      }
    })
};
