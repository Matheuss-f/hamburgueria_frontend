import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';

function PrivateRoutes({ component, ...props }) {
  const user = localStorage.getItem('codeburger:userData');

  if (!user) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} component={component} />;
}

export default PrivateRoutes;

PrivateRoutes.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
};
