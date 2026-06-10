import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const useRequireLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  const requireLogin = (targetPath) => {
    if (isLoggedIn) return true;
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

    navigate(path, { state: { from } });
  };

  return { isLoggedIn, requireLogin, goToPlayer };
};

export default useRequireLogin;
