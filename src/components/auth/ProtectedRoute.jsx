import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const isGoogleLoggedIn = useAuthStore((s) => s.isGoogleLoggedIn);
  const location = useLocation();

  if (!isGoogleLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
