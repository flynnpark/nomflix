import React, { useState, useEffect } from 'react';
import { moviesAPI, tvAPI, MovieDetail, TvDetail } from '../api';
import { withRouter, RouteComponentProps } from 'react-router';

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

const Detail: React.FunctionComponent<
  RouteComponentProps<{ id: string | undefined }>
> = ({ location: { pathname }, history: { push }, match: { params } }) => {
  if (params.id) {
    const parsedId = parseInt(params.id);
    if (isNaN(parsedId)) {
      push('/');
    }
  }

  return <div>Detail</div>;
};

export default withRouter(Detail);
