import {Link} from 'react-router-dom';
export default function Home(){
    return <section className="hero">
        <div><span className="eyebrow"> Just make it happen</span><h1>Ride better Ride equipped.
            </h1><p>Everything Your Bike Needs. All in One Place.
                </p><Link className="btn" to="/products">Explore products
                </Link></div><div className="hero-card">
                    <div className="hero-orb">P</div>
                    <h3>Prowoxi Accessories</h3>
                    <p>Curated goods. Simple decisions.</p>
                    </div></section>}
import React from "react";