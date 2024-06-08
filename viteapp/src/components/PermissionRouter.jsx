import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { checkUserPermission } from '../utils';

const PermissionRoute = ({ element: Component, permission }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const checkPermission = async () => {
      const permissionStatus = await checkUserPermission(permission);
      setHasPermission(permissionStatus);
    };
    checkPermission();
  }, [permission]);

  if (hasPermission === null) {
    // Optionally, show a loading indicator while checking permission
    return <div>Loading...</div>;
  }

  return hasPermission ? Component : <Navigate to="/permissionerror" />;
};

PermissionRoute.propTypes = {
  element: PropTypes.element.isRequired,
  permission: PropTypes.string.isRequired
};

export default PermissionRoute;