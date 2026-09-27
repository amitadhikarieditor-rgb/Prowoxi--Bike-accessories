
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
    const { user } = useAuth();

    return (
        <section className="profile-page">
    <div className="section-head">
        <div>
            <span className="eyebrow">ACCOUNT</span>
            <h1>My Profile</h1>
            <p className="muted">Manage your account and personal details.</p>
        </div>
    </div>

    <div className="profile-card">
        <div className="profile-avatar">
            <h1>{user?.name?.charAt(0).toUpperCase()}</h1>
        </div>

        <div className="profile-info">
            <div>
                <span className="label">Full Name</span>
                <h2>{user?.name || '—'}</h2>
            </div>

            <div>
                <span className="label">Email Address</span>
                <p>{user?.email || '—'}</p>
            </div>
        </div>
    </div>

    <div className="profile-actions">
        <Link className="btn" to="/addresses">
            Manage Addresses
        </Link>
    </div>
</section>
    );
}