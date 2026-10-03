import { Link, useNavigate } from 'react-router-dom';
import {
    ShoppingBag,
    Heart,
    LogOut,
    LayoutDashboard,
    Bell,
    Menu,
    X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { notifications } from '../api/resources';
import { useEffect, useState } from 'react';
import React from 'react';
import ThemeToggle from "./ThemeToggle";

import "../styles/HamburgerMenu.css";

export default function Header() {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const nav = useNavigate();

    const [notification, setNotification] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

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
        setMenuOpen(false);
        nav('/notifications');
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(prev => {
            const next = !prev;

            if (next) {
                setTimeout(() => {
                    document.querySelector('.header')?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 50);
            }

            return next;
        });
    };

    const handleLogout = async () => {
        await logout();
        setMenuOpen(false);
        nav('/');
    };

    return (
        <>
            <header className="header">

                <Link
                    className="brand"
                    to="/"
                    onClick={closeMenu}
                >
                    PROWOXI
                </Link>

        
                <nav className="desktop-nav">

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
                                onClick={handleLogout}
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

                    <ThemeToggle />

                </nav>
                <button
                    className="hamburger-btn"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? (
                        <X size={24} />
                    ) : (
                        <Menu size={24} />
                    )}
                </button>

            </header>
            {menuOpen && (
                <div className="mobile-menu">

                    <Link
                        to="/products"
                        onClick={closeMenu}
                    >
                        Shop
                    </Link>

                    {user && (
                        <Link
                            to="/wishlist"
                            onClick={closeMenu}
                        >
                            <Heart size={18} />
                            <span>Wishlist</span>
                        </Link>
                    )}

                    <Link
                        to="/cart"
                        onClick={closeMenu}
                    >
                        <ShoppingBag size={18} />
                        <span>Cart</span>

                        <span className="mobile-count">
                            {cart?.items?.reduce(
                                (n, i) => n + i.quantity,
                                0
                            ) || 0}
                        </span>
                    </Link>

                    {user ? (
                        <>
                            <Link
                                to="/orders"
                                onClick={closeMenu}
                            >
                                Orders
                            </Link>

                            <Link
                                to="/notifications"
                                onClick={handleNotificationClick}
                            >
                                <Bell size={18} />
                                <span>Notifications</span>
                            </Link>

                            {user.role === 'admin' && (
                                <Link
                                    to="/admin"
                                    onClick={closeMenu}
                                >
                                    <LayoutDashboard size={18} />
                                    <span>Admin</span>
                                </Link>
                            )}

                            <Link
                                to="/profile"
                                className="mobile-profile"
                                onClick={closeMenu}
                            >
                                <div className="profile-av">
                                    <h1>
                                        {user?.name
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </h1>
                                </div>

                                <span>
                                    {user?.name || 'Profile'}
                                </span>
                            </Link>

                            <button
                                className="mobile-logout"
                                onClick={handleLogout}
                            >
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={closeMenu}
                            >
                                Login
                            </Link>

                            <Link
                                className="btn small"
                                to="/register"
                                onClick={closeMenu}
                            >
                                Get started
                            </Link>
                        </>
                    )}

                    <div className="mobile-theme">
                        <ThemeToggle />
                    </div>

                </div>
            )}

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


