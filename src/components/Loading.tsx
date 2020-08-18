import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 28px;
  margin-top: 20px;
`;

const Loading: React.FunctionComponent = () => (
  <Container>
    <span role="img" aria-label="Loading">
      Loading...
    </span>
  </Container>
);

export default Loading;
