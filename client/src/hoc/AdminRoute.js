import { Navigate } from "react-router-dom";
import { useGetUser } from "../services/auth.service";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isLoading, isAdmin } = useGetUser();
  if (!isAuthenticated && !isLoading && !isAdmin) {
    return <Navigate to='/' />;
  }

  return <>{children}</>;
};

export default AdminRoute;
