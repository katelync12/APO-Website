import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../utils';

const PrivateRoute = ({ element: Component }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setAuth(authStatus);
    };
    checkAuth();
  }, []);

  if (auth === null) {
    // Optionally, show a loading indicator while checking authentication
    return <div>Loading...</div>;
  }

  return auth ? Component : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired
};

export default PrivateRoute;