import React, { useState, useEffect } from 'react';
import { TvItem, tvAPI } from '../api';

const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorEvent | null>(null);
  const [result, setResult] = useState<{
    topRated: TvItem[] | null;
    popular: TvItem[] | null;
    airingToday: TvItem[] | null;
  } | null>(null);

  const fetchData = async () => {
    try {
      const {
        data: { results: topRated }
      } = await tvAPI.topRated();
      const {
        data: { results: popular }
      } = await tvAPI.popular();
      const {
        data: { results: airingToday }
      } = await tvAPI.airingToday();
      setResult({
        topRated,
        popular,
        airingToday
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

  return { result, loading, error };
};

const TV: React.FunctionComponent = () => {
  const { result, loading, error } = useFetch();
  console.log(result, loading, error);
  return <div>TV</div>;
};

export default TV;
