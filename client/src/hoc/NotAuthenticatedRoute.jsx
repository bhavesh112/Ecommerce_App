import { Navigate, Route } from "react-router-dom";
import { useGetUser } from "../services/auth.service";

const NotAuthenticatedRoute = ({ children }) => {
  const { isAuthenticated } = useGetUser();
  if (isAuthenticated) return <Navigate to='/' />;
  return children;
};

export default NotAuthenticatedRoute;
