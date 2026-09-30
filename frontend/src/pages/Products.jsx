import { useEffect, useState } from 'react';
import React from 'react';
import { products, wishlist } from '../api/resources';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

import royalEnfieldVideo from '../styles/13760090_1080_1920_30fps.mp4';
import ktmVideo from '../styles/14921010-uhd_1440_1920_30fps.mp4';
import yamahaVideo from '../styles/12191614_2160_3840_30fps.mp4';
import pulsarVideo from '../styles/12303678_2160_3840_30fps.mp4';
import bajajVideo from '../styles/12009618_2160_3840_30fps.mp4';
import tvsVideo from '../styles/tvsVideo.mp4';
import heroVideo from '../styles/heroVideo.mp4';
import hondaVideo from '../styles/hondaVideo.mp4';
import truimphVideo from '../styles/truimphVideo.mp4';
import bgvideo from '../styles/mixkit-soft-and-traslucent-smoke-flows-up-on-a-dark-background-50956-full-hd.mp4';

const bikes = [
    {
        name: 'Royal Enfield',
        slug: 'royal-enfield',
        video: royalEnfieldVideo
    },
    {
        name: 'KTM',
        slug: 'ktm',
        video: ktmVideo
    },
    {
        name: 'Yamaha',
        slug: 'yamaha',
        video: yamahaVideo
    },
    {
        name: 'Pulsar',
        slug: 'pulsar',
        video: pulsarVideo
    },
    {
        name: 'Bajaj',
        slug: 'bajaj',
        video: bajajVideo
    },
    {
        name: 'honda',
        slug: 'honda',
        video: hondaVideo
    },
    {
        name: 'truimph',
        slug: 'truimph',
        video: truimphVideo
    },
    {
        name: 'hero',
        slug: 'hero',
        video: bajajVideo
    },
    {
        name: 'tvs',
        slug: 'tvs',
        video: tvsVideo
    }
];

export default function Products() {

    const [data, setData] = useState({
        data: [],
        pagination: {}
    });

    const [q, setQ] = useState('');
    const [sort, setSort] = useState('newest');
    const [loading, setLoading] = useState(true);
    const [wishlistItems, setWishlistItems] = useState([]);

    const load = () => {
        setLoading(true);

        products
            .list({
                q: q || undefined,
                sort,
                page: 1,
                limit: 12
            })
            .then(r => setData(r.data))
            .finally(() => setLoading(false));
    };

    const loadWishlist = () => {
        wishlist
            .get()
            .then(r => {
                setWishlistItems(r.data.data.products || []);
            })
            .catch(() => {
                setWishlistItems([]);
            });
    };

    const handleWishlist = async id => {
        await wishlist.toggle(id);
        loadWishlist();
    };

    useEffect(() => {
        load();
        loadWishlist();
    }, [sort]);

    return (
        <section className="products-page">

            <div className="products-bg-video">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source
                        src={bgvideo}
                        type="video/mp4"
                    />
                </video>
            </div>

            <div className="products-content">

                <div className="bike-selector">

                    <span className="eyebrow choose-text">
                        CHOOSE YOUR RIDE
                    </span>

                    <div className="bike-scroll">

                        {bikes.map(bike => (
                            <Link
                                key={bike.slug}
                                to={`/bikes/${bike.slug}`}
                                className="bike-card"
                            >
                                <video
                                    className="bike-video"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                >
                                    <source
                                        src={bike.video}
                                        type="video/mp4"
                                    />
                                </video>

                                <div className="bike-overlay">
                                    <h3>{bike.name}</h3>
                                    <p>View accessories</p>
                                </div>

                            </Link>
                        ))}

                    </div>
                </div>

                <div className="section-head">

                    <div>
                        <span className="eyebrow">
                            CATALOG
                        </span>

                        <h1>Shop Prowoxi</h1>
                    </div>

                    <div className="filters">

                        <input
                            className="search"
                            value={q}
                            onChange={e => setQ(e.target.value)}
                            onKeyDown={e =>
                                e.key === 'Enter' && load()
                            }
                            placeholder="Search products…"
                        />

                        <select
                            className="sort-drop"
                            value={sort}
                            onChange={e =>
                                setSort(e.target.value)
                            }
                        >
                            <option value="newest">
                                Newest
                            </option>

                            <option value="price_asc">
                                Price: low to high
                            </option>

                            <option value="price_desc">
                                Price: high to low
                            </option>

                            <option value="rating">
                                Rating
                            </option>
                        </select>

                    </div>
                </div>

                {loading ? (
                    <p>Loading products…</p>
                ) : (
                    <div className="grid">

                        {data.data.map(product => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                isWishlisted={wishlistItems.some(
                                    item => item._id === product._id
                                )}
                                onWishlist={handleWishlist}
                            />
                        ))}

                    </div>
                )}

            </div>

        </section>
    );
}