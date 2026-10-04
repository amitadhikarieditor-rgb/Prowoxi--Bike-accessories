import React, { useState } from 'react';
import {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import video from '../styles/285224_medium.mp4';

export default function Login() {

    useEffect(() => {
        document.title = 'LOGIN- PROWOXI';
    }, []);


    const { login } = useAuth();
    const nav = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const submit = async err => {
        err.preventDefault();

        try {
            await login(form);
            nav('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
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

            <form className="form card" onSubmit={submit}>
                <span className="eyebrow">WELCOME BACK</span>

                <h1>Log in</h1>

                {error && <div className="alert">{error}</div>}

                <input
                    type="email"
                    required
                    placeholder="Email"
                    value={form.email}
                    onChange={err =>
                        setForm({ ...form, email: err.target.value })
                    }
                />

                <input
                    type="password"
                    required
                    placeholder="Password"
                    value={form.password}
                    onChange={err =>
                        setForm({ ...form, password: err.target.value })
                    }
                />

                <button className="btn">Log in</button>

                <p className="muted">
                    New here? <Link to="/register">Create an account</Link>
                </p>
            </form>

        </section>
    );
}