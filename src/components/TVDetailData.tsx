import React from 'react';
import Helmet from 'react-helmet';
import { TvDetail } from 'api';
import {
  Data,
  ItemContainer,
  Title,
  Item,
  Divider,
  Overview
} from 'routes/Detail';

interface IProps {
  result: TvDetail;
}

const TVDetailData: React.FC<IProps> = ({ result }) => (
  <Data>
    <Helmet title={`${result.original_name} | Nomflix`} />
    <Title>{result.original_name}</Title>
    <ItemContainer>
      <Item>{result.first_air_date.substring(0, 4)}</Item>
      <Divider>•</Divider>
      <Item>{result.episode_run_time[0]} min</Item>
      <Divider>•</Divider>
      <Item>
        {result.genres &&
          result.genres.map((genre, index) =>
            index === result.genres.length - 1 ? genre.name : `${genre.name} / `
          )}
      </Item>
    </ItemContainer>
    <Overview>{result.overview}</Overview>
  </Data>
);

export default TVDetailData;
