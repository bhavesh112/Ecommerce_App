import Login from "../pages/Login/Login";
import Password from "../pages/Password/Password";
import NotAuthenticatedRoute from "../hoc/NotAuthenticatedRoute";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import { Route, Routes } from "react-router-dom";
import AuthenticatedRoute from "../hoc/AuthenticatedRoute";
import AdminRoute from "../hoc/AdminRoute";
import Settings from "../pages/Settings/Settings";
import ProductSearch from "../pages/ProductPage/ProductSearch";
import ProductCategory from "../pages/ProductPage/ProductCategory";
import SingleProduct from "../pages/SingleProduct/SingleProduct";
import Checkout from "../pages/checkout/Checkout";
import Cart from "../pages/Cart/Cart";
import Orders from "../pages/Orders/Orders";
const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<ProductSearch />} />
      <Route path='/products/:category_id' element={<ProductCategory />} />
      <Route path='/product/:product_id' element={<SingleProduct />} />
      <Route
        path='/cart'
        element={
          <AuthenticatedRoute>
            <Cart />
          </AuthenticatedRoute>
        }
      />
      <Route
        path='/orders'
        element={
          <AuthenticatedRoute>
            <Orders />
          </AuthenticatedRoute>
        }
      />
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
      <Route
        path='/settings'
        element={
          <AdminRoute>
            <Settings />
          </AdminRoute>
        }
      />
      <Route
        path='/checkout'
        element={
          <AuthenticatedRoute>
            <Checkout />
          </AuthenticatedRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
