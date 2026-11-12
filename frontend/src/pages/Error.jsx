
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Home,
    Bike,
    Search,
    MapPin,
    Wrench,
    Gauge
} from "lucide-react";

import "../styles/Error.css";

export default function Error() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    return (
        <main className="error-page">
            <div className="error-noise" aria-hidden="true" />
            <div className="error-grid" aria-hidden="true" />

            <div className="error-orb error-orb-one" />
            <div className="error-orb error-orb-two" />
            <div className="error-orb error-orb-three" />

            <div className="error-floating error-floating-one" aria-hidden="true">⚙️</div>
            <div className="error-floating error-floating-two" aria-hidden="true">🏍️</div>
            <div className="error-floating error-floating-three" aria-hidden="true">🔧</div>
            <div className="error-floating error-floating-four" aria-hidden="true">⚡</div>
            <div className="error-floating error-floating-five" aria-hidden="true">🛞</div>

            <div className="speed-lines" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} />
                ))}
            </div>

            <section className="error-content">
                <div className="error-badge">
                    <MapPin size={14} />
                    <span>YOU HAVE LEFT THE ROAD</span>
                </div>

                <div className="error-bike-wrapper">
                    <div className="error-bike-circle">
                        <Bike size={58} strokeWidth={1.3} />
                    </div>
                    <div className="error-bike-ring" />
                    <span className="error-bike-emoji">🏍️</span>
                </div>

                <div className="error-number" aria-label="404">
                    <span>4</span>
                    <div className="error-zero">
                        <div className="zero-inner">
                            <Bike size={42} strokeWidth={1.4} />
                        </div>
                    </div>
                    <span>4</span>
                </div>

                <h1>
                    Looks like you took
                    <br />
                    <span>the wrong turn.</span>
                </h1>

                <p className="error-description">
                    This page seems to have disappeared somewhere
                    between <strong>first gear</strong> and <strong>full throttle</strong>.
                    <br />
                    Don't worry — no bikes were harmed. 😎
                </p>

                <div className="error-route">
                    <div className="route-icon">
                        <Search size={15} />
                    </div>
                    <div className="route-info">
                        <span>You tried to reach</span>
                        <strong title={location.pathname}>
                            {location.pathname}
                        </strong>
                    </div>
                </div>

                <div className="error-actions">
                    <Link to="/" className="error-btn error-btn-primary">
                        <Home size={17} />
                        Take Me Home
                    </Link>

                    <button
                        type="button"
                        className="error-btn error-btn-secondary"
                        onClick={handleGoBack}
                    >
                        <ArrowLeft size={17} />
                        Go Back
                    </button>
                </div>

                <nav className="error-links" aria-label="Suggested pages">
                    <span>Maybe you're looking for:</span>
                    <Link to="/products">🛍️ Products</Link>
                    <Link to="/bikes">🏍️ Bikes</Link>
                    <Link to="/wishlist">❤️ Wishlist</Link>
                </nav>

                <div className="error-card">
                    <div className="error-card-icon">
                        <Wrench size={19} />
                    </div>

                    <div className="error-card-content">
                        <div className="error-card-title">
                            🧑‍🔧 Rider's Tip
                        </div>
                        <p>
                            Even experienced riders miss a turn.
                            <br />
                            Just don't follow Google Maps next time. 😂
                        </p>
                    </div>

                    <div className="error-card-stat">
                        <Gauge size={16} />
                        <span>404 km/h</span>
                    </div>
                </div>
            </section>

            <div className="error-road" aria-hidden="true">
                <div className="road-line road-line-one" />
                <div className="road-line road-line-two" />
            </div>

            <footer className="error-footer">
                <div className="error-footer-brand">PROWOXI</div>
                <div className="error-footer-divider" />
                <span>RIDE WITH CONFIDENCE</span>
                <span className="error-footer-dot">•</span>
                <span>🏍️ KEEP RIDING</span>
            </footer>
        </main>
    );
}
