import { Link } from 'react-router-dom';
import React from "react";

const bikes = [
    { id: 'royal-enfield-classic-350', name: 'Royal Enfield Classic 350' },
    { id: 'royal-enfield-hunter-350', name: 'Royal Enfield Hunter 350' },
    { id: 'ktm-duke-390', name: 'KTM Duke 390' },
    { id: 'yamaha-r15', name: 'Yamaha R15' },
];

export default function Bikes() {
    return (
        <section className="bikes-page">
            <div className="section-head">
                <div>
                    <span className="eyebrow">FIND YOUR BIKE</span>
                    <h1>Choose Your Bike</h1>
                    <p className="muted">
                        Find accessories made for your motorcycle.
                    </p>
                </div>
            </div>

            <div className="bike-grid">
                {bikes.map(bike => (
                    <Link
                        key={bike.id}
                        to={`/bikes/${bike.id}`}
                        className="bike-card"
                    >
                        <div className="bike-image">
                            <span>{bike.name}</span>
                        </div>

                        <div className="bike-info">
                            <h3>{bike.name}</h3>
                            <span>View accessories →</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}