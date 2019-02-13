import React, { useState, useEffect } from 'react';
import { moviesAPI, MovieItem } from '../api';

const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorEvent | null>(null);
  const [result, setResult] = useState<{
    nowPlaying: MovieItem[] | null;
    upcoming: MovieItem[] | null;
    popular: MovieItem[] | null;
  } | null>(null);

  const fetchData = async () => {
    try {
      const {
        data: { results: nowPlaying }
      } = await moviesAPI.nowPlaying();
      const {
        data: { results: upcoming }
      } = await moviesAPI.upcoming();
      const {
        data: { results: popular }
      } = await moviesAPI.popular();
      setResult({
        nowPlaying,
        upcoming,
        popular
      });
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, result, error };
};

const Home: React.FunctionComponent = () => {
  const { loading, result, error } = useFetch();
  return <div>Home</div>;
};

export default Home;
