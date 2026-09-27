import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import React from "react";


export default function ProtectedRoute({ admin = false }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="screen-center">Loading…</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (admin && user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}