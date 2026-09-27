import React, { useEffect, useState } from 'react';
import { admin } from '../api/resources';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const { user } = useAuth();
    const [d, setD] = useState(null);

    useEffect(() => {
        admin.dashboard().then(r => setD(r.data.data));
    }, []);

    return (
        <section>
            <Link to="/profile" className="profile-avatar">
    <h1>{user?.name?.charAt(0).toUpperCase()}</h1>
</Link>

            <span className="eyebrow">OVERVIEW</span>
            <h1>Admin dashboard</h1>

            <div className="stats">
                {[
                    ['Users', d?.users],
                    ['Products', d?.products],
                    ['Orders', d?.orders],
                    ['Revenue', `₹${(d?.revenue || 0).toLocaleString('en-IN')}`]
                ].map(([a, b]) => (
                    <div className="stat" key={a}>
                        <span>{a}</span>
                        <strong>{b ?? '—'}</strong>
                    </div>
                ))}
            </div>
        </section>
    );
}