import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { moviesAPI, tvAPI, MovieDetail, TvDetail } from '../api';
import Loading from '../components/Loading';
import MovieDetailData from '../components/MovieDetailData';
import TVDetailData from '../components/TVDetailData';

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div<{ bgURL: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgURL});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div<{ bgURL: string }>`
  width: 30%;
  background-image: url(${props => props.bgURL});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

export const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

export const Title = styled.h3`
  font-size: 32px;
`;

export const ItemContainer = styled.div`
  margin: 20px 0;
`;

export const Item = styled.span``;

export const Divider = styled.span`
  margin: 0 10px;
`;

export const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const useFetch = (pathname: string, id: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorEvent | null>(null);
  const [result, setResult] = useState<MovieDetail | TvDetail | null>(null);

  const fetchData = async () => {
    try {
      if (pathname.includes('/movie/')) {
        const { data } = await moviesAPI.movieDetail(id);
        setResult(data);
      } else {
        const { data } = await tvAPI.showDetail(id);
        setResult(data);
      }
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

const renderData = (result: MovieDetail | TvDetail) => {
  if ('original_title' in result) {
    return <MovieDetailData result={result} />;
  } else if ('original_name' in result) {
    return <TVDetailData result={result} />;
  }
  return null;
};

const Detail: React.FunctionComponent<
  RouteComponentProps<{ id: string | undefined }>
> = ({ location: { pathname }, history: { push }, match: { params } }) => {
  if (!params.id) {
    push('/');
    return null;
  } else {
    const parsedId = parseInt(params.id);
    if (isNaN(parsedId)) {
      push('/');
    }
    const { loading, result, error } = useFetch(pathname, parsedId);
    return (
      <>
        {loading ? (
          <>
            <Helmet title="Loading | Nomflix" />
            <Loading />
          </>
        ) : (
          <Container>
            {result && (
              <>
                <Backdrop
                  bgURL={`https://image.tmdb.org/t/p/original${
                    result.backdrop_path
                  }`}
                />
                <Content>
                  <Cover
                    bgURL={
                      result.poster_path
                        ? `https://image.tmdb.org/t/p/original${
                            result.poster_path
                          }`
                        : require('../assets/noPosterSmall.png')
                    }
                  />
                  {renderData(result)}
                </Content>
              </>
            )}
          </Container>
        )}
      </>
    );
  }
};

export default withRouter(Detail);
