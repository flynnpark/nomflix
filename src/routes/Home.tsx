import React, { useState, useEffect } from 'react';
import { moviesAPI, MovieItem } from '../api';

interface IHome {
  nowPlaying?: MovieItem[] | null;
  upcoming?: MovieItem[] | null;
  popular?: MovieItem[] | null;
}

const Home: React.FunctionComponent<IHome> = ({
  nowPlaying = null,
  upcoming = null,
  popular = null
}) => {
  const [loading, setLoading] = useState(true);
  const [nowPlayingList, setNowPlaying] = useState(nowPlaying);
  const [upcomingList, setUpcoming] = useState(upcoming);
  const [popularList, setPopular] = useState(popular);

  useEffect(() => {
    const callNowPlaying = moviesAPI.nowPlaying().then(result => {
      const {
        data: { results }
      } = result;
      setNowPlaying(results);
    });
    const callUpcoming = moviesAPI.upcoming().then(result => {
      const {
        data: { results }
      } = result;
      setUpcoming(results);
    });
    const callPopular = moviesAPI.popular().then(result => {
      const {
        data: { results }
      } = result;
      setPopular(results);
    });
    Promise.all([callNowPlaying, callUpcoming, callPopular]).then(() =>
      setLoading(false)
    );
  }, []);
  console.log(loading);
  return <div>Home</div>;
};

export default Home;
