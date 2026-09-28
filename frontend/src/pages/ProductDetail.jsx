import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, reviews } from '../api/resources';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import React from "react"

export default function ProductDetail() {
    const { id } = useParams();
    const nav = useNavigate();

    const { add } = useCart();
    const { user } = useAuth();

    const [p, setP] = useState(null);
    const [rs, setRs] = useState([]);
    const [qty, setQty] = useState(1);
    const [body, setBody] = useState('');
    const [rating, setRating] = useState(5);

    useEffect(() => {
        products.get(id).then(r => setP(r.data.data));
        reviews.list(id).then(r => setRs(r.data.data));
    }, [id]);

    if (!p) return <p>Loading…</p>;

    const addCart = async () => {
        if (!user) return nav('/login');

        await add({
            productId: p._id,
            quantity: qty
        });

        nav('/cart');
    };

    const review = async e => {
        e.preventDefault();

        if (!user) return nav('/login');

        const r = await reviews.create(id, {
            rating: Number(rating),
            body
        });

        setRs(x => [r.data.data, ...x]);
        setBody('');
    };

    return (
        <section className="detail">
            <div>
                <img
                    className="detail-img"
                    src={p.images?.[0]}
                    alt={p.name}
                />
            </div>

            <div>
                <span className="eyebrow">{p.category?.name}</span>

                <h1>{p.name}</h1>

                <div className="price">
                    ₹{p.price.toLocaleString('en-IN')}
                </div>

                <p className="muted">
                    ★ {p.ratingAverage?.toFixed(1) || '0.0'} ·{' '}
                    {p.ratingCount || 0} reviews
                </p>

                <p>{p.description}</p>

                <div className="buy-row">
                    <input
                        type="number"
                        min="1"
                        max={p.stock}
                        value={qty}
                        onChange={e => setQty(Number(e.target.value))}
                    />

                    <button
                        className="btn"
                        disabled={!p.stock}
                        onClick={addCart}
                    >
                        {p.stock ? 'Add to cart' : 'Out of stock'}
                    </button>
                </div>
            </div>

            <div className="reviews">
                <h2>Reviews</h2>

                {user && (
                    <form onSubmit={review} className="form">
                        <select
                            value={rating}
                            onChange={e => setRating(e.target.value)}
                        >
                            {[5, 4, 3, 2, 1].map(n => (
                                <option key={n}>{n}</option>
                            ))}
                        </select>

                        <textarea
                            value={body}
                            onChange={e => setBody(e.target.value)}
                            required
                            placeholder="Share your experience"
                        />

                        <button className="btn">
                            Submit review
                        </button>
                    </form>
                )}

                {rs.map(r => (
                    <article className="review" key={r._id}>
                        <strong>
                            {r.user?.name || 'Customer'}
                        </strong>

                        <span> ★ {r.rating}</span>

                        <p>{r.body}</p>

                        {r.verifiedPurchase && (
                            <small>Verified purchase</small>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}