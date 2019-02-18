import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { TvItem, tvAPI } from '../api';
import Loading from '../components/Loading';
import Section from '../components/Section';
import Poster from '../components/Poster';

const Container = styled.div`
  padding: 20px;
`;

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

  return { loading, result, error };
};

const TV: React.FunctionComponent = () => {
  const { loading, result, error } = useFetch();
  return (
    <>
      <Helmet title="TV Shows | Nomflix" />
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {result && result.topRated && result.topRated.length > 0 && (
            <Section title="Top Rated">
              {result.topRated.map(show => (
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
          {result && result.popular && result.popular.length > 0 && (
            <Section title="Popular">
              {result.popular.map(show => (
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
          {result && result.airingToday && result.airingToday.length > 0 && (
            <Section title="Airing Today">
              {result.airingToday.map(show => (
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
        </Container>
      )}
    </>
  );
};

export default TV;
