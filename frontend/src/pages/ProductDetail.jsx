import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, reviews } from '../api/resources';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import React from 'react';

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
    const [currentImage, setCurrentImage] = useState(0);

    const [zoom, setZoom] = useState({
        x: 0,
        y: 0,
        show: false
    });

    useEffect(() => {
        products.get(id)
            .then(r => setP(r.data.data));

        reviews.list(id)
            .then(r => setRs(r.data.data));
    }, [id]);

    if (!p) {
        return <p>Loading…</p>;
    }

    const images = p.images || [];

    const nextImage = () => {
        setCurrentImage(prev =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImage(prev =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const addCart = async () => {
        if (!user) {
            return nav('/login');
        }

        await add({
            productId: p._id,
            quantity: qty
        });

        nav('/cart');
    };

    const review = async e => {
        e.preventDefault();

        if (!user) {
            return nav('/login');
        }

        const r = await reviews.create(id, {
            rating: Number(rating),
            body
        });

        setRs(x => [
            r.data.data,
            ...x
        ]);

        setBody('');
    };

    return (
        <section className="detail">

            <div className="product-slider-card">

                <div className="product-slider">

                    <button
                        className="slider-btn slider-prev"
                        onClick={prevImage}
                        disabled={images.length <= 1}
                    >
                        ‹
                    </button>

                    {images.length > 0 && (
                        <div
                            className="image-magnifier"
                            onMouseMove={e => {
                                const rect = e.currentTarget.getBoundingClientRect();

                                const x =
                                    ((e.clientX - rect.left) / rect.width) * 100;

                                const y =
                                    ((e.clientY - rect.top) / rect.height) * 100;

                                setZoom({
                                    x,
                                    y,
                                    show: true
                                });
                            }}
                            onMouseLeave={() =>
                                setZoom(prev => ({
                                    ...prev,
                                    show: false
                                }))
                            }
                        >
                            <img
                                key={currentImage}
                                className="detail-img"
                                src={images[currentImage]}
                                alt={`${p.name} ${currentImage + 1}`}
                            />

                            {zoom.show && (
                                <div
                                    className="zoom-preview"
                                    style={{
                                        backgroundImage: `url(${images[currentImage]})`,
                                        backgroundPosition: `${zoom.x}% ${zoom.y}%`
                                    }}
                                />
                            )}
                        </div>
                    )}

                    <button
                        className="slider-btn slider-next"
                        onClick={nextImage}
                        disabled={images.length <= 1}
                    >
                        ›
                    </button>

                </div>

                {images.length > 1 && (
                    <div className="slider-dots">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={
                                    index === currentImage
                                        ? 'slider-dot active'
                                        : 'slider-dot'
                                }
                                onClick={() =>
                                    setCurrentImage(index)
                                }
                            />
                        ))}
                    </div>
                )}

            </div>

            <div className="product-info">

                <span className="eyebrow">
                    {p.category?.name}
                </span>

                <h1>{p.name}</h1>

                <div className="price">
                    ₹{p.price.toLocaleString('en-IN')}
                </div>

                <p className="muted">
                    ★ {p.ratingAverage?.toFixed(1) || '0.0'}
                    {' · '}
                    {p.ratingCount || 0} reviews
                </p>

                <p>{p.description}</p>

                <div className="buy-row">

                    <input
                        type="number"
                        min="1"
                        max={p.stock}
                        value={qty}
                        onChange={e =>
                            setQty(Number(e.target.value))
                        }
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
                    <form
                        onSubmit={review}
                        className="form"
                    >

                        <select
                            value={rating}
                            onChange={e =>
                                setRating(e.target.value)
                            }
                        >
                            {[5, 4, 3, 2, 1].map(n => (
                                <option
                                    key={n}
                                    value={n}
                                >
                                    {n}
                                </option>
                            ))}
                        </select>

                        <textarea
                            value={body}
                            onChange={e =>
                                setBody(e.target.value)
                            }
                            required
                            placeholder="Share your experience"
                        />

                        <button className="btn">
                            Submit review
                        </button>

                    </form>
                )}

                {rs.map(r => (
                    <article
                        className="review"
                        key={r._id}
                    >

                        <strong>
                            {r.user?.name || 'Customer'}
                        </strong>

                        <span>
                            {' '}★ {r.rating}
                        </span>

                        <p>{r.body}</p>

                        {r.verifiedPurchase && (
                            <small>
                                Verified purchase
                            </small>
                        )}

                    </article>
                ))}

            </div>

        </section>
    );
}