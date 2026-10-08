import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import bikeVideo from '../styles/mixkit-man-traveling-by-motorcycle-on-an-empty-road-39912-full-hd.mp4';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const nav = useNavigate();
    const { user, logout } = useAuth();

    return (
        <section className="profile-page">

                 <button
    className="back-btn"
    onClick={() => nav('/products')}
>
    ← Back
</button>

            <div className="profile-video-bg">
                <video autoPlay muted loop playsInline>
                    <source src={bikeVideo} type="video/mp4" />
                </video>
            </div>

            <div className="profile-content">

                <div className="section-head">
                    <div>
                        <h1 className="eyebrow">ACCOUNT</h1>
                        <h2>My Profile</h2>
                        <p className="muted-text">
                            Manage your account and personal details.
                        </p>
                    </div>
                </div>

                <div className="profile-card">

                    <div className="profile-avatar">
                        <h1>
                            {user?.name?.charAt(0).toUpperCase()}
                        </h1>
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

                   <button
    className="icon-btn logout-btn"
    onClick={async () => {
        await logout();
    }}
    title="Logout"
>
    <LogOut size={20} />
</button>

                </div>

                <div className="profile-actions">
                    <Link className="btn" to="/addresses">
                        Manage Addresses
                    </Link>
                </div>

            </div>
        </section>
    );
}