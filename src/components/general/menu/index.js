import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

function Menu({ children }) {
  return (
    <>
      <Container>this is menu</Container>
      {children}
    </>
  );
}

Menu.propTypes = {
  children: PropTypes.element,
};

Menu.defaultProps = {
  children: null,
};

export default Menu;
