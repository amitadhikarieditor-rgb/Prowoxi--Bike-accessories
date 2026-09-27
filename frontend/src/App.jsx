import {BrowserRouter,Routes,Route} from 'react-router-dom';
 import React from "react";
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Wishlist from './pages/Wishlist';
import Addresses from './pages/Addresses';
import Notifications from './pages/Notifications';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import AdminProducts from './admin/Products';
import Users from './admin/Users';
import AdminOrders from './admin/Orders';
import Reviews from './admin/Reviews';
import Coupons from './admin/Coupons';
import Profile from "./pages/Profile.jsx";

export default function App(){
    return <BrowserRouter>
    <Routes>
        <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}/>
        
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:id" element={<ProductDetail/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>


        <Route element={<ProtectedRoute/>}>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/orders/:id" element={<OrderDetail/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/addresses" element={<Addresses/>}/>
        <Route path="/notifications" element={<Notifications/>}/>
        <Route path="/profile" element={<Profile />} />
        </Route>
        
        </Route>
        
        <Route element={<ProtectedRoute admin/>}>
        <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<Dashboard/>}/>
    
        <Route path="products" element={<AdminProducts/>}/>
        <Route path="users" element={<Users/>}/>
        <Route path="orders" element={<AdminOrders/>}/>
        <Route path="reviews" element={<Reviews/>}/>
        <Route path="coupons" element={<Coupons/>}/>

        </Route>
        </Route>
        </Routes>
        </BrowserRouter>}

