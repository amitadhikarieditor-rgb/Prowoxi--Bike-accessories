import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, reviews } from '../api/resources';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import ProductCard from '../components/ProductCard';
import { MoreVertical, Trash2, Pencil } from 'lucide-react';

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

    const [openMenu, setOpenMenu] = useState(null);

    const [editingReview, setEditingReview] = useState(null);
    const [editRating, setEditRating] = useState(5);

    const [zoom, setZoom] = useState({
        x: 0,
        y: 0,
        show: false
    });

    useEffect(() => {
         document.title = 'PROVOXI - Product';

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

    if (!p) {
        return <p>Loading…</p>;
    }

    const images = p.images || [];

    const nextImage = () => {

        setCurrentImage(prev =>
            prev === images.length - 1
                ? 0
                : prev + 1
        );

    };

    const prevImage = () => {

        setCurrentImage(prev =>
            prev === 0
                ? images.length - 1
                : prev - 1
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

        try {

            const r = await reviews.create(id, {
                rating: Number(rating),
                body
            });

            setRs(x => [
                r.data.data,
                ...x
            ]);

            setBody('');
            setRating(5);

        } catch (error) {

            console.error(
                'Create review error:',
                error
            );

        }

    };


    const handleEditReview = r => {

        setEditingReview(r);
        setEditRating(r.rating);
        setBody(r.body || '');
        setOpenMenu(null);

        setTimeout(() => {

            document
                .querySelector('.review-form')
                ?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

        }, 100);

    };


    const handleUpdateReview = async e => {

        e.preventDefault();

        if (!editingReview) {
            return;
        }

        try {

            const response = await reviews.update(
                editingReview._id,
                {
                    rating: Number(editRating),
                    body
                }
            );

            setRs(current =>
                current.map(review =>
                    review._id === editingReview._id
                        ? {
                            ...review,
                            ...response.data.data,
                            user: review.user,
                            isOwner: true
                        }
                        : review
                )
            );

            setEditingReview(null);
            setBody('');
            setEditRating(5);
            setRating(5);

        } catch (error) {

            console.error(
                'Update review error:',
                error
            );

        }

    };

 
    const handleCancelEdit = () => {

        setEditingReview(null);
        setBody('');
        setEditRating(5);
        setRating(5);

    };


    const handleDeleteReview = async reviewId => {

        try {

            if (!window.confirm('Delete this review?')) {
                return;
            }

            await reviews.remove(reviewId);

            setRs(current =>
                current.filter(review => review._id !== reviewId)
            );

            setOpenMenu(null);

        } catch (error) {

            console.error(
                'Delete review error:',
                error
            );

        }

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

            <div className="reviews">

                <div className="reviews-heading">

                    <span className="eyebrow">
                        CUSTOMER FEEDBACK
                    </span>

                    <h2>
                        Reviews
                    </h2>

                </div>

                {user && (

                    <form
                        onSubmit={
                            editingReview
                                ? handleUpdateReview
                                : review
                        }
                        className="form review-form"
                    >

                        <div className="rating-input">

                            {[1, 2, 3, 4, 5].map(star => (

                                <button
                                    type="button"
                                    key={star}

                                    className={
                                        star <= (
                                            editingReview
                                                ? editRating
                                                : rating
                                        )
                                            ? 'star active'
                                            : 'star'
                                    }

                                    onClick={() => {

                                        if (editingReview) {
                                            setEditRating(star);
                                        } else {
                                            setRating(star);
                                        }

                                    }}
                                >
                                    ★
                                </button>

                            ))}

                        </div>

                        <textarea
                            value={body}

                            onChange={e =>
                                setBody(e.target.value)
                            }

                            required

                            placeholder={
                                editingReview
                                    ? 'Update your experience'
                                    : 'Share your experience'
                            }
                        />

                        <div className="review-form-actions">

                            <button className="btn">
                                {editingReview
                                    ? 'Update review'
                                    : 'Submit review'}
                            </button>

                            {editingReview && (

                                <button
                                    type="button"
                                    className="btn"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>

                            )}

                        </div>

                    </form>

                )}

                <div className="reviews-list">

                    {rs.length > 0 ? (

                        rs.map(r => (

                            <article
                                className="review"
                                key={r._id}
                            >

                                <div className="review-header">

                                    <div className="review-user">

                                        <div>

                                            <h4>
                                                {r.user?.name ||
                                                    'Customer'}
                                            </h4>

                                            {r.createdAt && (

                                                <small>
                                                    {new Date(
                                                        r.createdAt
                                                    ).toLocaleDateString(
                                                        'en-IN',
                                                        {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        }
                                                    )}
                                                </small>

                                            )}

                                        </div>

                                    </div>

                                    {r.isOwner && (

                                        <div className="review-menu">

                                            <button
                                                type="button"
                                                className="review-menu-btn"

                                                onClick={() =>
                                                    setOpenMenu(
                                                        openMenu === r._id
                                                            ? null
                                                            : r._id
                                                    )
                                                }

                                                aria-label="Review options"
                                            >

                                                <MoreVertical
                                                    size={22}
                                                    strokeWidth={2}
                                                />

                                            </button>

                                            {openMenu === r._id && (

                                                <div className="review-dropdown">

                                                    <button
                                                        type="button"
                                                        className="edit-review"

                                                        onClick={() =>
                                                            handleEditReview(r)
                                                        }
                                                    >

                                                        <Pencil size={15} />

                                                        <div>
                                                            Edit
                                                            </div>

                                                       
                                                        

                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="delete-review"

                                                        onClick={() =>
                                                            handleDeleteReview(
                                                                r._id
                                                            )
                                                        }
                                                    >

                                                        <Trash2 size={15} />

                                                        <span>
                                                            Delete
                                                        </span>

                                                    </button>

                                                </div>

                                            )}

                                        </div>

                                    )}

                                </div>

                                <div className="review-rating">

                                    {[1, 2, 3, 4, 5].map(star => (

                                        <span
                                            key={star}

                                            className={
                                                star <= r.rating
                                                    ? 'filled'
                                                    : ''
                                            }
                                        >
                                            ★
                                        </span>

                                    ))}

                                </div>

                                <p className="review-comment">
                                    {r.body}
                                </p>

                                {r.verifiedPurchase && (

                                    <span className="verified-review">
                                        ✓ Verified purchase
                                    </span>

                                )}

                            </article>

                        ))

                    ) : (

                        <div className="no-reviews">

                            <p>
                                No reviews yet. Be the first to
                                share your experience.
                            </p>

                        </div>

                    )}

                </div>

            </div>

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