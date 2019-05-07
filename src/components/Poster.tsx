import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 12px;
`;

const Image = styled.div<{ bgURL: string }>`
  background-image: url(${props => props.bgURL});
  height: 180px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
`;

const Rating = styled.span`
  bottom: 5px;
  right: 5px;
  position: absolute;
  opacity: 0;
  transition: opacity 0.1s linear;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Rating} {
      opacity: 1;
    }
  }
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;

const Year = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

interface IProps {
  id: number;
  imageURL: string;
  title: string;
  rating: number;
  year: string;
  isMovie?: boolean;
}

const Poster: React.FunctionComponent<IProps> = ({
  id,
  imageURL,
  title,
  rating,
  year,
  isMovie = false
}) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image
          bgURL={
            imageURL
              ? `https://image.tmdb.org/t/p/w300${imageURL}`
              : require('assets/noPosterSmall.png')
          }
        />
        <Rating>
          <span role="img" aria-label="rating">
            ★
          </span>{' '}
          {rating}/10
        </Rating>
      </ImageContainer>
      <Title>
        {title.length > 18 ? `${title.substring(0, 18)}...` : title}
      </Title>
      <Year>{year}</Year>
    </Container>
  </Link>
);

export default Poster;
