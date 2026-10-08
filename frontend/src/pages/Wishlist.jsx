import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { wishlist } from '../api/resources';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {

    const nav = useNavigate();

    const [data, setData] = useState([]);

    const load = () =>
        wishlist
            .get()
            .then(r => setData(r.data.data.products || []));

    useEffect(() => {
        document.title = 'PROWOXI - Wishlist';
        load();
    }, []);

    return (
        <section>

            <button
                className="back-btn"
                onClick={() => nav(-1)}
            >
                ← Back
            </button>

            <h1>Wishlist</h1>

            <div className="grid">
                {data.map((prod) => (
                    <ProductCard
                        key={prod._id}
                        product={prod}
                        isWishlisted={true}
                        onWishlist={async (id) => {
                            await wishlist.toggle(id);
                            load();
                        }}
                    />
                ))}
            </div>

        </section>
    );
}