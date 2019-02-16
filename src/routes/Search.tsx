import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MovieItem, TvItem, moviesAPI, tvAPI } from '../api';
import Loading from '../components/Loading';
import Section from '../components/Section';

const Container = styled.div`
  padding: 0px 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

const useInput = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = event;
    setValue(value);
  };

  return { value, onChange };
};

const useFetch = (term: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorEvent | null>(null);
  const [results, setResults] = useState<{
    movieResults: MovieItem[] | null;
    tvResults: TvItem[] | null;
  } | null>(null);

  const fetchData = async () => {
    try {
      const {
        data: { results: movieResults }
      } = await moviesAPI.search(term);
      const {
        data: { results: tvResults }
      } = await tvAPI.search(term);
      setResults({
        movieResults,
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
  }, [term]);

  return { loading, results, error };
};

const Search: React.FunctionComponent = () => {
  const term = useInput('');
  const [termValue, setTermValue] = useState('');
  const { loading, results, error } = useFetch(termValue);
  return (
    <Container>
      <Form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          setTermValue(term.value);
        }}
      >
        <Input {...term} placeholder="Search Movies or TV Shows..." />
      </Form>
      {loading ? (
        <Loading />
      ) : (
        <>
          {results && results.movieResults && results.movieResults.length > 0 && (
            <Section title="Movie Results">
              {results.movieResults.map(movie => (
                <span key={movie.id}>{movie.title}</span>
              ))}
            </Section>
          )}
          {results && results.tvResults && results.tvResults.length > 0 && (
            <Section title="TV Show Results">
              {results.tvResults.map(show => (
                <span key={show.id}>{show.name}</span>
              ))}
            </Section>
          )}
        </>
      )}
    </Container>
  );
};

export default Search;
