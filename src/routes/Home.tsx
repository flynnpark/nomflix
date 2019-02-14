import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { moviesAPI, MovieItem } from '../api';
import Loading from '../components/Loading';
import Section from '../components/Section';

const Container = styled.div`
  padding: 0px 10px;
`;

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
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {result && result.nowPlaying && result.nowPlaying.length > 0 && (
            <Section title="Now Playing">
              {result.nowPlaying.map(movie => movie.title)}
            </Section>
          )}
          {result && result.upcoming && result.upcoming.length > 0 && (
            <Section title="Upcoming">
              {result.upcoming.map(movie => movie.title)}
            </Section>
          )}
          {result && result.popular && result.popular.length > 0 && (
            <Section title="Popular">
              {result.popular.map(movie => movie.title)}
            </Section>
          )}
        </Container>
      )}
    </>
  );
};

export default Home;
