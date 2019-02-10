import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navigation = styled.header`
  ul {
    display: flex;
  }
`;

const List = styled.ul`
  display: flex;
  :hover {
    background-color: grey;
  }
`;

const ListItem = styled.li``;

const StyledLink = styled(Link)``;

const Header: React.FunctionComponent = () => (
  <Navigation>
    <List>
      <ListItem>
        <StyledLink to="/">Movies</StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink to="/tv">TV</StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink to="/search">Search</StyledLink>
      </ListItem>
    </List>
  </Navigation>
);

export default Header;
