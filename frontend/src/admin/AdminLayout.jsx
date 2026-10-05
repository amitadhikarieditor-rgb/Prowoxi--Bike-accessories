import {NavLink,Outlet} from 'react-router-dom';
import Header from '../components/Header';


export default function AdminLayout(){
    return <>
    
    <div className="admin-shell">
        <aside><strong>PROVOXI ADMIN</strong>

        <NavLink to="/admin">Dashboard</NavLink>
        
        <NavLink to="/admin/products">Products</NavLink>

        <NavLink to="/admin/users">Users</NavLink>

        <NavLink to="/admin/orders">Orders</NavLink>

        <NavLink to="/admin/reviews">Reviews</NavLink>
        
        <NavLink to="/admin/coupons">Coupons</NavLink>
        </aside>
        <div className="admin-content"><Outlet/></div>
        </div>
        
        </>
        
    }
import React from "react";