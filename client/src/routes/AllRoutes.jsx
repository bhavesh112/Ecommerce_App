import Login from "../pages/Login/Login";
import Password from "../pages/Password/Password";
import NotAuthenticatedRoute from "../hoc/NotAuthenticatedRoute";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import { Route, Routes } from "react-router-dom";
import AuthenticatedRoute from "../hoc/AuthenticatedRoute";
import AdminRoute from "../hoc/AdminRoute";
import Settings from "../pages/Settings/Settings";
import ProductPage from "../pages/ProductPage/ProductPage";
import ProductSearch from "../pages/ProductPage/ProductSearch";
import ProductCategory from "../pages/ProductPage/ProductCategory";
import SingleProduct from "../pages/SingleProduct/SingleProduct";
import Checkout from "../pages/checkout/Checkout";
const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<ProductSearch />} />
      <Route path='/products/:category_id' element={<ProductCategory />} />
      <Route path='/product/:product_id' element={<SingleProduct />} />
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
      <Route path='/checkout' element={<Checkout/>}/>
    </Routes>

    
  );
};

export default AllRoutes;
