import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, reviews } from '../api/resources';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {

    const { id } = useParams();
    const nav = useNavigate();

    const { add } = useCart();
    const { user } = useAuth();

    const [p, setP] = useState(null);
    const [rs, setRs] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    const [qty, setQty] = useState(1);
    const [body, setBody] = useState('');
    const [rating, setRating] = useState(5);
    const [currentImage, setCurrentImage] = useState(0);

    const [zoom, setZoom] = useState({
        x: 0,
        y: 0,
        show: false
    });


    /* =========================
       FETCH PRODUCT
    ========================= */

    useEffect(() => {

        setP(null);
        setCurrentImage(0);

        products.get(id)
            .then(r => {
                setP(r.data.data);
            })
            .catch(err => {
                console.error('Product fetch error:', err);
            });

        reviews.list(id)
            .then(r => {
                setRs(r.data.data);
            })
            .catch(err => {
                console.error('Reviews fetch error:', err);
            });

        products.list({
            page: 1,
            limit: 100
        })
            .then(r => {
                setAllProducts(r.data.data);
            })
            .catch(err => {
                console.error('Products fetch error:', err);
            });

    }, [id]);


    /* =========================
       LOADING
    ========================= */

    if (!p) {
        return <p>Loading…</p>;
    }


    /* =========================
       IMAGES
    ========================= */

    const images = p.images || [];


    /* =========================
       NEXT IMAGE
    ========================= */

    const nextImage = () => {

        setCurrentImage(prev =>
            prev === images.length - 1
                ? 0
                : prev + 1
        );

    };


    /* =========================
       PREVIOUS IMAGE
    ========================= */

    const prevImage = () => {

        setCurrentImage(prev =>
            prev === 0
                ? images.length - 1
                : prev - 1
        );

    };


    /* =========================
       ADD TO CART
    ========================= */

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


    /* =========================
       ADD REVIEW
    ========================= */

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


            {/* =====================================
                PRODUCT IMAGE SLIDER
            ===================================== */}

            <div className="product-slider-card">

                <div className="product-slider">


                    {/* PREVIOUS BUTTON */}

                    <button
                        className="slider-btn slider-prev"
                        onClick={prevImage}
                        disabled={images.length <= 1}
                    >
                        ‹
                    </button>


                    {/* IMAGE */}

                    {images.length > 0 && (

                        <div
                            className="image-magnifier"

                            onMouseMove={e => {

                                const rect =
                                    e.currentTarget.getBoundingClientRect();

                                const x =
                                    ((e.clientX - rect.left) /
                                        rect.width) * 100;

                                const y =
                                    ((e.clientY - rect.top) /
                                        rect.height) * 100;

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


                            {/* ZOOM */}

                            {zoom.show && (

                                <div
                                    className="zoom-preview"

                                    style={{
                                        backgroundImage:
                                            `url(${images[currentImage]})`,

                                        backgroundPosition:
                                            `${zoom.x}% ${zoom.y}%`
                                    }}
                                />

                            )}

                        </div>

                    )}


                    {/* NEXT BUTTON */}

                    <button
                        className="slider-btn slider-next"
                        onClick={nextImage}
                        disabled={images.length <= 1}
                    >
                        ›
                    </button>

                </div>


                {/* IMAGE DOTS */}

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


            {/* =====================================
                PRODUCT INFORMATION
            ===================================== */}

            <div className="product-info">

                <span className="eyebrow">
                    {p.category?.name}
                </span>


                <h1>
                    {p.name}
                </h1>


                <div className="price">
                    ₹{p.price.toLocaleString('en-IN')}
                </div>


                <p className="muted">

                    ★ {p.ratingAverage?.toFixed(1) || '0.0'}

                    {' · '}

                    {p.ratingCount || 0} reviews

                </p>


                <p>
                    {p.description}
                </p>


                {/* BUY ROW */}

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

                        {p.stock
                            ? 'Add to cart'
                            : 'Out of stock'}

                    </button>

                </div>

            </div>


            {/* =====================================
                REVIEWS
            ===================================== */}

            <div className="reviews">

                <h2>
                    Reviews
                </h2>


                {/* REVIEW FORM */}

                {user && (

                    <form
                        onSubmit={review}
                        className="form"
                    >


                        {/* STAR RATING */}

                        <div className="rating-input">

                            {[1, 2, 3, 4, 5].map(star => (

                                <button
                                    type="button"
                                    key={star}

                                    className={
                                        star <= rating
                                            ? 'star active'
                                            : 'star'
                                    }

                                    onClick={() =>
                                        setRating(star)
                                    }
                                >
                                    ★
                                </button>

                            ))}

                        </div>


                        {/* REVIEW TEXT */}

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


                {/* REVIEWS LIST */}

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


                        <p>
                            {r.body}
                        </p>


                        {r.verifiedPurchase && (

                            <small>
                                Verified purchase
                            </small>

                        )}

                    </article>

                ))}

            </div>


            {/* =====================================
                ALL PRODUCTS
            ===================================== */}

            <div className="related-products">


                <div className="section-head">

                    <div>

                        <span className="eyebrow">
                            EXPLORE
                        </span>

                        <h2>
                            All Products
                        </h2>

                    </div>

                </div>


                {/* PRODUCT GRID */}

                <div className="grid">

                    {allProducts.map(product => (

                        <ProductCard
                            key={product._id}
                            product={product}
                        />

                    ))}

                </div>

            </div>


        </section>

    );

}