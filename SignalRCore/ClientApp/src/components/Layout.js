import React from 'react';
import { Container, Row } from 'reactstrap';
import NavMenu from './NavMenu/NavMenu';

export default props => (
  <div>
    <NavMenu />
    <Container fluid>
      {props.children}
    </Container>
  </div>
);
