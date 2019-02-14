import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TvItem, tvAPI } from '../api';
import Loading from '../components/Loading';
import Section from '../components/Section';

const Container = styled.div`
  padding: 0px 10px;
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
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {result && result.topRated && result.topRated.length > 0 && (
            <Section title="Now Playing">
              {result.topRated.map(show => show.name)}
            </Section>
          )}
          {result && result.popular && result.popular.length > 0 && (
            <Section title="Upcoming">
              {result.popular.map(show => show.name)}
            </Section>
          )}
          {result && result.airingToday && result.airingToday.length > 0 && (
            <Section title="Popular">
              {result.airingToday.map(show => show.name)}
            </Section>
          )}
        </Container>
      )}
    </>
  );
};

export default TV;
