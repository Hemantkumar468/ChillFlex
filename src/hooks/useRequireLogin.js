import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const useRequireLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGoogleLoggedIn = useAuthStore((s) => s.isGoogleLoggedIn);

  const requireLogin = (targetPath) => {
    if (isGoogleLoggedIn) return true;
    navigate("/login", { state: { from: targetPath } });
    return false;
  };

  const goToPlayer = (type, id) => {
    const path = `/player/${type}/${id}`;
    const from = {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
    };

    if (requireLogin(path)) navigate(path, { state: { from } });
  };

  return { isGoogleLoggedIn, requireLogin, goToPlayer };
};

export default useRequireLogin;
