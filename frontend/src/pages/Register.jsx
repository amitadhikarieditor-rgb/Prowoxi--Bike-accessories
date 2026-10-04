import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import video from '../styles/285224_medium.mp4';

export default function Register() {
    const { register } = useAuth();
    const nav = useNavigate();

    const [Form, SetForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const s = async e => {
        e.preventDefault();

        try {
            await register(Form);
            nav('/');
        } catch (e) {
            setError(e.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <section className="auth">

            <video
                className="auth-video"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src={video} type="video/mp4" />
            </video>

            <form className="form card" onSubmit={s}>
                <span className="eyebrow">PROWOXI</span>

                <h1>Create account</h1>

                {error && <div className="alert">{error}</div>}

                <input
                    required
                    placeholder="Full name"
                    value={Form.name}
                    onChange={e => SetForm({ ...Form, name: e.target.value })}
                />

                <input
                    required
                    type="email"
                    placeholder="Email"
                    value={Form.email}
                    onChange={e => SetForm({ ...Form, email: e.target.value })}
                />

                <input
                    required
                    minLength="8"
                    type="password"
                    placeholder="Password"
                    value={Form.password}
                    onChange={e => SetForm({ ...Form, password: e.target.value })}
                />

                <button className="btn">Create account</button>

                <p className="muted">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </form>

        </section>
    );
}