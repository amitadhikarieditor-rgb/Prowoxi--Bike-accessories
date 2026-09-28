import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../api/resources';
import ProductCard from '../components/ProductCard';

const bikes = [
    {
        name: 'Royal Enfield',
        value: 'royal-enfield'
    },
    {
        name: 'KTM',
        value: 'ktm'
    },
    {
        name: 'Yamaha',
        value: 'yamaha'
    },
    {
        name: 'Honda',
        value: 'honda'
    },
    {
        name: 'Bajaj',
        value: 'bajaj'
    }
];

export default function BikeProducts() {

    const { bike } = useParams();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const currentBike = bikes.find(
        item => item.value === bike
    );

    useEffect(() => {

        setLoading(true);

        products.list({
            bike: bike,
            page: 1,
            limit: 100
        })
        .then(r => {
            setData(r.data.data);
        })
        .finally(() => {
            setLoading(false);
        });

    }, [bike]);

    if (!currentBike) {
        return (
            <section>
                <h1>Bike not found</h1>
                <Link to="/products">
                    Back to Products
                </Link>
            </section>
        );
    }

    return (
        <section>

            <div className="section-head">

                <div>

                    <span className="eyebrow">
                        {currentBike.name.toUpperCase()}
                    </span>

                    <h1>
                        {currentBike.name} Accessories
                    </h1>

                    <p className="muted">
                        Explore accessories for your {currentBike.name}.
                    </p>

                </div>

                <Link
                    to="/products"
                    className="btn danger"
                >
                    ← All Bikes
                </Link>

            </div>


            {loading ? (

                <p>
                    Loading products...
                </p>

            ) : data.length === 0 ? (

                <p>
                    No products available for {currentBike.name}.
                </p>

            ) : (

                <div className="grid">

                    {data.map(product => (

                        <ProductCard
                            key={product._id}
                            product={product}
                        />

                    ))}

                </div>

            )}

        </section>
    );
}