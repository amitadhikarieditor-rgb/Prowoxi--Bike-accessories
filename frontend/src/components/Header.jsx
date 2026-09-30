import { Link, useNavigate } from 'react-router-dom';
import {
    ShoppingBag,
    Heart,
    LogOut,
    LayoutDashboard,
    Bell
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { notifications } from '../api/resources';
import { useEffect, useState } from 'react';
import React from 'react';

export default function Header() {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const nav = useNavigate();

    const [notification, setNotification] = useState(null);

    useEffect(() => {
        if (!user) return;

        const loadNotification = async () => {
            try {
                const res = await notifications.list();
                const unread = res.data.data.find(n => !n.isRead);

                if (unread) {
                    setNotification(unread);
                }
            } catch (e) {
                console.error('Failed to load notifications');
            }
        };

        loadNotification();
    }, [user]);

    const handleNotificationClick = () => {
        setNotification(null);
        nav('/notifications');
    };

    return (
        <>
            <header className="header">
                 <Link className="brand" to="/">
    PROWOXI
</Link>

                <nav>
                    <Link to="/products">
                        Shop
                    </Link>

                    {user && (
                        <Link to="/wishlist">
                            <Heart size={18} />
                        </Link>
                    )}

                    <Link to="/cart">
                        <ShoppingBag size={18} />

                        <span className="count">
                            {cart?.items?.reduce(
                                (n, i) => n + i.quantity,
                                0
                            ) || 0}
                        </span>
                    </Link>

                    {user ? (
                        <>
                            <Link to="/orders">
                                Orders
                            </Link>

                            <Link
                                to="/notifications"
                                className="notification-icon"
                            >
                                <Bell size={18} />
                            </Link>

                            {user.role === 'admin' && (
                                <Link to="/admin">
                                    <LayoutDashboard size={18} />
                                </Link>
                            )}

                            <Link
                                to="/profile"
                                className="profile-av"
                            >
                                <h1>
                                    {user?.name
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </h1>
                            </Link>

                            <button
                                className="icon-btn"
                                onClick={async () => {
                                    await logout();
                                    nav('/');
                                }}
                            >
                                <LogOut size={18} />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link
                                className="btn small"
                                to="/register"
                            >
                                Get started
                            </Link>
                        </>
                    )}
                </nav>
            </header>

            {notification && (
                <div
                    className="notification-flash"
                    onClick={handleNotificationClick}
                >
                    <Bell size={20} />

                    <div>
                        <strong>
                            {notification.title}
                        </strong>

                        <p>
                            {notification.message}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}