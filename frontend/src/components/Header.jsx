import {Link,useNavigate} from 'react-router-dom';
import {ShoppingBag,Heart,UserRound,LogOut,LayoutDashboard} from 'lucide-react';
import {useAuth} from '../contexts/AuthContext';
import {useCart} from '../contexts/CartContext';
import React from "react";
export default function Header(){
    const {user,logout}=useAuth();
    const {cart}=useCart();const nav=useNavigate();
    return <header className="header">
        <Link className="brand" to="/">PROWOXI</Link>

        <nav><Link to="/products">Shop</Link>{user&&<Link to="/wishlist">
        <Heart size={18}/></Link>}
        
        <Link to="/cart">
        <ShoppingBag size={18}/>
        <span className="count">
            {cart?.items?.reduce((n,i)=>n+i.quantity,0)||0}</span>
            </Link>{user?<><Link to="/orders">Orders</Link>{user.role==='admin'&&<Link to="/admin">
            <LayoutDashboard size={18}/></Link>}

            <Link to="/profile" className="profile-avatar" size={18}>
    <h1>{user?.name?.charAt(0).toUpperCase()}</h1>
</Link>

            <button className="icon-btn" onClick={async()=>{
                await logout();nav('/')}}>
                    <LogOut size={18}/>
                    </button></>:<><Link to="/login">Login</Link>
                    <Link className="btn small" to="/register">Get started</Link></>}</nav>
                    </header>
                    }


