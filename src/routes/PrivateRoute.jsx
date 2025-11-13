import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // TODO: Replace with your actual authentication logic
  const isAuthenticated = false; // Change this based on your auth context/state

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
