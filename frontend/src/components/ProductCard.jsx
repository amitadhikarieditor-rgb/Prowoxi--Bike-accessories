import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function ProductCard({
    product,
    onWishlist,
    isWishlisted
}) {
    return (
        <article className="card product-card">

            <div className="product-image-wrap">

                <Link to={`/products/${product._id}`}>
                    <img
                        src={product.images?.[0]}
                        alt={product.name}
                    />
                </Link>

                {onWishlist && (
                    <button
                        type="button"
                        className={`wishlist-btn ${
                            isWishlisted ? 'active' : ''
                        }`}
                        onClick={() =>
                            onWishlist(product._id)
                        }
                        aria-label={
                            isWishlisted
                                ? 'Remove from wishlist'
                                : 'Add to wishlist'
                        }
                    >
                        <Heart
                            size={20}
                            fill={
                                isWishlisted
                                    ? 'currentColor'
                                    : 'none'
                            }
                        />
                    </button>
                )}

            </div>

            <div className="card-body">

                <div className="row-between">

                    <h3>
                        {product.name}
                    </h3>

                </div>

                <p className="muted">
                    {product.category?.name || 'Product'}
                </p>

                <strong>
                    ₹
                    {Number(product.price || 0).toLocaleString(
                        'en-IN'
                    )}
                </strong>

                <span className="rating">
                    ★{' '}
                    {product.ratingAverage
                        ? product.ratingAverage.toFixed(1)
                        : '0.0'}
                </span>

            </div>

        </article>
    );
}