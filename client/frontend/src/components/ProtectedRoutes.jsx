// This component protects certain routes by checking if the user is authenticated.
// It calls the backend /user/verify endpoint to confirm the JWT stored in cookies is valid.

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  // State to track whether the user is authenticated
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    // Call backend to verify token validity
    axios
      .get("http://localhost:5555/user/verify", { withCredentials: true })
      // withCredentials ensures cookies (where JWT is stored) are sent with the request
      .then((res) => {
        setIsAuth(res.data.status); // true if token is valid
      })
      .catch(() => setIsAuth(false)); // false if verification fails
  }, []);

  // While waiting for backend response, show a loading state
  if (isAuth === null) {
    return <p>Loading authentication check...</p>;
  }

  // If authenticated, render the protected page
  // If not, redirect to login
  return isAuth ? children : <Navigate to="/user/login" />;
};

// Declare prop types so ESLint knows what props are expected
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  // PropTypes.node covers anything React can render(string, element, fragment, etc.)
};

export default ProtectedRoute;
