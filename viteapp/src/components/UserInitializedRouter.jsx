import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { isUserInitialized } from "../utils";

const UserInitializedRoute = ({ element: Component }) => {
  const [isInitialized, setIsInitialized] = useState(null);

  useEffect(() => {
    const checkInitialized = async () => {
      const initialized = await isUserInitialized();
      setIsInitialized(initialized);
    };
    checkInitialized();
  }, []);

  if (isInitialized === null) {
    // Optionally, show a loading indicator while checking permission
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-white-200">
        <h1 className="text-royal-blue font-medium">Loading...</h1>
      </div>
    );
  }

  return isInitialized ? Component : <Navigate to="/createuserprofile" />;
};

UserInitializedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default UserInitializedRoute;