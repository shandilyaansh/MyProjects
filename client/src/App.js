import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Policy from './pages/Policy';
import Contact from './pages/Contact';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/user/Dashboard';
import ForgotPassword from './pages/user/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import { useAuth } from './context/auth';
import PrivateRoute from './components/Routes/Private';
import AdminRoute from './components/Routes/AdminRoutes';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';


function App() {
  const [auth, setAuth] = useAuth()
  const data = localStorage.getItem("auth");
  useEffect(() => {
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
        // role:parseData.role,
      });
    }
    // eslint-disable-next-line 
  }, [])
  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:slug' element={<ProductDetails/>} />
        <Route path='/search' element={<Search />} />
        <Route path='/dashboard' element={<PrivateRoute />} >
          <Route path='' element={<Pagenotfound />} />
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/orders' element={<Orders />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute />} >
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/product/:slug' element={<UpdateProduct />} />
          <Route path='admin/users' element={<Users />} />
          <Route path='admin/products' element={<Products />} />
        </Route>
        <Route path='/about' element={<About />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='*' element={<Pagenotfound />} />
      </Routes>
    </>

  );
}
// export function ProctectedRoutes(props) {
//   if (localStorage.getItem('auth')) return props.children
//   // else return <Navigate to='/login' />
//   else return <Spinner />
// }
export default App;
