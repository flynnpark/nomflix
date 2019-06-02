import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { moviesAPI, MovieItem } from 'api';
import Loading from 'components/Loading';
import Section from 'components/Section';
import Poster from 'components/Poster';

const Container = styled.div`
  padding: 20px;
`;

const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorEvent | null>(null);
  const [result, setResult] = useState<{
    nowPlaying: MovieItem[] | null;
    upcoming: MovieItem[] | null;
    popular: MovieItem[] | null;
  } | null>(null);
  useEffect(() => {
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
    fetchData();
  }, []);

  return { loading, result, error };
};

const Home: React.FC = () => {
  const { loading, result } = useFetch();
  return (
    <>
      <Helmet title="Movies | Nomflix" />
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {result && result.nowPlaying && result.nowPlaying.length > 0 && (
            <Section title="Now Playing">
              {result.nowPlaying.map(movie => (
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
          {result && result.upcoming && result.upcoming.length > 0 && (
            <Section title="Upcoming">
              {result.upcoming.map(movie => (
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
          {result && result.popular && result.popular.length > 0 && (
            <Section title="Popular">
              {result.popular.map(movie => (
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
        </Container>
      )}
    </>
  );
};

export default Home;
