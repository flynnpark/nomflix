import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

const Navigation = styled.header`
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li<{ current: boolean }>`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${props => (props.current ? '#3498db' : 'transparent')};
  transition: border-bottom 0.5s ease-in-out;
`;

const StyledLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header: React.FunctionComponent<RouteComponentProps> = ({
  location: { pathname }
}) => (
  <Navigation>
    <List>
      <ListItem current={pathname === '/'}>
        <StyledLink to="/">Movies</StyledLink>
      </ListItem>
      <ListItem current={pathname === '/tv'}>
        <StyledLink to="/tv">TV</StyledLink>
      </ListItem>
      <ListItem current={pathname === '/search  '}>
        <StyledLink to="/search">Search</StyledLink>
      </ListItem>
    </List>
  </Navigation>
);

export default withRouter(Header);
