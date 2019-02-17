import React from 'react';
import { MovieDetail } from '../api';
import {
  Data,
  ItemContainer,
  Title,
  Item,
  Divider,
  Overview
} from '../routes/Detail';

interface IProps {
  result: MovieDetail;
}

const MovieDetailData: React.FunctionComponent<IProps> = ({ result }) => (
  <Data>
    <Title>{result.original_title}</Title>
    <ItemContainer>
      <Item>{result.release_date.substring(0, 4)}</Item>
      <Divider>•</Divider>
      <Item>{result.runtime} min</Item>
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

export default MovieDetailData;
