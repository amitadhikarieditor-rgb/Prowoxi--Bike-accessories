import { useEffect, useState } from 'react';
import React from 'react';
import { products } from '../api/resources';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

import royalEnfieldVideo from '../styles/13760090_1080_1920_30fps.mp4';
import ktmVideo from '../styles/14921010-uhd_1440_1920_30fps.mp4';
import yamahaVideo from '../styles/12191614_2160_3840_30fps.mp4';
import pulsarVideo from '../styles/12303678_2160_3840_30fps.mp4';
import bajajVideo from '../styles/12009618_2160_3840_30fps.mp4';

const bikes = [
    { name: 'Royal Enfield', slug: 'royal-enfield', video: royalEnfieldVideo },
    { name: 'KTM', slug: 'ktm', video: ktmVideo },
    { name: 'Yamaha', slug: 'yamaha', video: yamahaVideo },
    { name: 'pulsar', slug: 'honda', video: pulsarVideo },
    { name: 'Bajaj', slug: 'bajaj', video: bajajVideo }
];

export default function Products() {

    const [data, setData] = useState({
        data: [],
        pagination: {}
    });

    const [q, setQ] = useState('');
    const [sort, setSort] = useState('newest');
    const [loading, setLoading] = useState(true);

    const load = () => {
        setLoading(true);

        products.list({
            q: q || undefined,
            sort,
            page: 1,
            limit: 12
        })
            .then(r => setData(r.data))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        load();
    }, [sort]);

    return (
        <section>

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
                    <span className="eyebrow">CATALOG</span>
                    <h1>Shop Provoxi</h1>
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
                        onChange={e => setSort(e.target.value)}
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
                    {data.data.map(p => (
                        <ProductCard
                            key={p._id}
                            product={p}
                        />
                    ))}
                </div>
            )}

        </section>
    );
}