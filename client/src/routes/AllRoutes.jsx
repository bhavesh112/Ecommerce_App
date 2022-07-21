import Login from "../pages/Login/Login";
import Password from "../pages/Password/Password";
import NotAuthenticatedRoute from "../hoc/NotAuthenticatedRoute";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import { Route, Routes } from "react-router-dom";
import AuthenticatedRoute from "../hoc/AuthenticatedRoute";
const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route
        path='/register'
        element={
          <NotAuthenticatedRoute>
            <Register />
          </NotAuthenticatedRoute>
        }
      />
      <Route
        path='/login'
        element={
          <NotAuthenticatedRoute>
            <Login />
          </NotAuthenticatedRoute>
        }
      />
      <Route
        path='/change-password'
        element={
          <AuthenticatedRoute>
            <Password type='change' />
          </AuthenticatedRoute>
        }
      />
      <Route
        path='/reset-password/:token'
        element={
          <NotAuthenticatedRoute>
            <Password type='reset' />
          </NotAuthenticatedRoute>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <NotAuthenticatedRoute>
            <Password type='forgot' />
          </NotAuthenticatedRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
