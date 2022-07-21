import { Navigate } from "react-router-dom";
import { useGetUser } from "../services/auth.service";

const AuthenticatedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useGetUser();
  if (!isAuthenticated && !isLoading) {
    return <Navigate to='/login' />;
  }

  return <>{children}</>;
};

export default AuthenticatedRoute;
