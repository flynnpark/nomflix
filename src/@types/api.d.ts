export = APIResult;
export as namespace APIResult;

declare namespace APIResult {
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

  export interface TvItem {
    original_name: string;
    genre_ids: Array<number>;
    name: string;
    popularity: number;
    origin_country: Array<string>;
    vote_count: number;
    first_air_date: string;
    backdrop_path: string;
    original_language: string;
    id: number;
    vote_average: number;
    overview: string;
    poster_path: string;
  }

  interface TvListData {
    page: number;
    total_results: number;
    total_pages: number;
    results: TvItem[];
  }

  interface TvProducer {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }

  interface LastEpisode {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: number | null;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  }

  interface Network {
    name: string;
    id: number;
    logo_path: string;
    origin_country: string;
  }

  interface TvCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }

  interface Season {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
  }

  interface TvDetail {
    backdrop_path: string;
    created_by: TvProducer[];
    episode_run_time: Array<number>;
    first_air_date: string;
    genres: Genre[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: Array<string>;
    last_air_date: string;
    last_episode_to_air: LastEpisode;
    name: string;
    next_episode_to_air: null;
    networks: Network[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: Array<string>;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: TvCompany[];
    seasons: Season[];
    status: string;
    type: string;
    vote_average: number;
    vote_count: number;
  }
}
