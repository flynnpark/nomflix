import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { MovieItem, TvItem, moviesAPI, tvAPI } from 'api';
import Loading from 'components/Loading';
import Section from 'components/Section';
import Poster from 'components/Poster';

const Container = styled.div`
  padding: 20px;
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (term.length === 0) return;
        setLoading(true);
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
    fetchData();
  }, [term]);

  return { loading, results, error };
};

const Search: React.FC = () => {
  const term = useInput('');
  const [termValue, setTermValue] = useState('');
  const { loading, results } = useFetch(termValue);
  return (
    <Container>
      <Helmet title="Search | Nomflix" />
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
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageURL={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {results && results.tvResults && results.tvResults.length > 0 && (
            <Section title="TV Show Results">
              {results.tvResults.map(show => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageURL={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
        </>
      )}
    </Container>
  );
};

export default Search;
