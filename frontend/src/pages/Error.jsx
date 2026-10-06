import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ArrowLeft,
    Home,
    Bike,
    Search,
    MapPin,
    Wrench,
    Gauge,
    CircleAlert
} from 'lucide-react';

import '../styles/error.css';

export default function Error() {
    const location = useLocation();

    return (
        <main className="error-page">

    
            <div className="error-noise"></div>
            <div className="error-grid"></div>

            <div className="error-orb error-orb-one"></div>
            <div className="error-orb error-orb-two"></div>
            <div className="error-orb error-orb-three"></div>

            <div className="error-floating error-floating-one">⚙️</div>
            <div className="error-floating error-floating-two">🏍️</div>
            <div className="error-floating error-floating-three">🔧</div>
            <div className="error-floating error-floating-four">⚡</div>
            <div className="error-floating error-floating-five">🛞</div>

            <div className="speed-lines">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>


            <section className="error-content">


                <div className="error-badge">
                    <MapPin size={14} />
                    <span>YOU HAVE LEFT THE ROAD</span>
                </div>

                <div className="error-bike-wrapper">

                    <div className="error-bike-circle">
                        <Bike
                            size={58}
                            strokeWidth={1.3}
                        />
                    </div>

                    <div className="error-bike-ring"></div>

                    <span className="error-bike-emoji">
                        🏍️
                    </span>

                </div>

      
                <div className="error-number">
                    <span>4</span>
                    <div className="error-zero">
                        <div className="zero-inner">
                            <Bike
                                size={42}
                                strokeWidth={1.4}
                            />
                        </div>
                    </div>
                    <span>4</span>
                </div>

                {/* Heading */}
                <h1>
                    Looks like you took
                    <br />
                    <span>the wrong turn.</span>
                </h1>

                {/* Description */}
                <p className="error-description">
                    This page seems to have disappeared somewhere
                    between <strong>first gear</strong> and <strong>full throttle</strong>.
                    <br />
                    Don't worry — no bikes were harmed. 😎
                </p>

                {/* Current route */}
                <div className="error-route">

                    <div className="route-icon">
                        <Search size={15} />
                    </div>

                    <div className="route-info">
                        <span>You tried to reach</span>
                        <strong>{location.pathname}</strong>
                    </div>

                </div>

                {/* Buttons */}
                <div className="error-actions">

                    <Link
                        to="/"
                        className="error-btn error-btn-primary"
                    >
                        <Home size={17} />
                        Take Me Home
                    </Link>

                    <button
                        type="button"
                        className="error-btn error-btn-secondary"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft size={17} />
                        Go Back
                    </button>

                </div>

                {/* Quick links */}
                <div className="error-links">

                    <span>Maybe you're looking for:</span>

                    <Link to="/products">
                        🛍️ Products
                    </Link>

                    <Link to="/bikes">
                        🏍️ Bikes
                    </Link>

                    <Link to="/wishlist">
                        ❤️ Wishlist
                    </Link>

                </div>

                {/* Funny card */}
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

            {/* Decorative road */}
            <div className="error-road">

                <div className="road-line road-line-one"></div>
                <div className="road-line road-line-two"></div>

            </div>

            {/* Bottom brand */}
            <footer className="error-footer">

                <div className="error-footer-brand">
                    PROWOXI
                </div>

                <div className="error-footer-divider"></div>

                <span>
                    RIDE WITH CONFIDENCE
                </span>

                <span className="error-footer-dot">
                    •
                </span>

                <span>
                    🏍️ KEEP RIDING
                </span>

            </footer>

        </main>
    );
}