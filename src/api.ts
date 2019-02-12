import Axios, { AxiosInstance, AxiosPromise } from 'axios';

const API: AxiosInstance = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: process.env.API_KEY,
    language: 'en-US'
  }
});

interface MovieItem {
  vote_count: number;
  id: number;
  video: boolean;
  vote_average: number;
  title: string;
  popularity: number;
  poster_path: string;
  original_language: string;
  original_title: string;
  genre_ids: Array<number>;
  backdrop_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
}

interface MovieListData {
  page: number;
  total_results: number;
  total_pages: number;
  results: MovieItem[];
}

interface Genre {
  id: number;
  name: string;
}

interface Company {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface Country {
  iso_3166_1: string;
  name: string;
}

interface Language {
  iso_639_1: string;
  name: string;
}

interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Company[];
  production_countries: Country[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface IMoviesAPI {
  nowPlaying: () => AxiosPromise<MovieListData>;
  upcoming: () => AxiosPromise<MovieListData>;
  popular: () => AxiosPromise<MovieListData>;
  movieDetail: (id: number) => AxiosPromise<MovieDetail>;
  search: (term: string) => AxiosPromise<MovieListData>;
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
  topRated: () => AxiosPromise<any>;
  popular: () => AxiosPromise<any>;
  airingToday: () => AxiosPromise<any>;
  showDetail: (id: number) => AxiosPromise<any>;
  search: (string: string) => AxiosPromise<any>;
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
