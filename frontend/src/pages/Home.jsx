import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import video from '../styles/285224_medium.mp4';

export default function Home() {

    useEffect(() => {
        document.title = 'WELCOME- PROWOXI';
    }, []);

    return (
        <section className="hero">

            <video
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src={video} type="video/mp4" />
            </video>

            <div className="hero-content">
                <span className="eyebrow">Just make it happen</span>

                <h1>
                    Ride better Ride equipped.
                </h1>

                <p>
                    Everything Your Bike Needs. All in One Place.
                </p>

                <Link className="btn" to="/products">
                    Explore products
                </Link>
            </div>

            <div className="hero-card">
                <div className="hero-orb">P</div>
                <h3>Prowoxi Bike Accessories</h3>
                <p>Curated goods. Simple decisions.</p>
            </div>

        </section>
    );
}