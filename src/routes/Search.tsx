import React, { useState, useEffect } from 'react';
import { MovieItem, TvItem, moviesAPI, tvAPI } from '../api';

const useInput = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = event;
    console.log(value);
    setValue(value);
  };

  return { value, onChange };
};

const useFetch = (term: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorEvent | null>(null);
  const [results, setResults] = useState<{
    moviesResults: MovieItem[] | null;
    tvResults: TvItem[] | null;
  } | null>(null);

  const fetchData = async () => {
    try {
      const {
        data: { results: moviesResults }
      } = await moviesAPI.search(term);
      const {
        data: { results: tvResults }
      } = await tvAPI.search(term);
      setResults({
        moviesResults,
        tvResults
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

  return { loading, results, error };
};

const Search: React.FunctionComponent = () => {
  const term = useInput('');
  return (
    <div>
      <input value={term.value} onChange={term.onChange} />
    </div>
  );
};

export default Search;
