import React,{ useEffect, useState } from 'react';
import { admin } from '../api/resources';

export default function Coupons() {
    const [d, setD] = useState([]);
    const [f, setF] = useState({
        code: '',
        type: 'percentage',
        value: 10,
        minOrder: 0,
        isActive: true
    });

    const load = () => {
        admin.coupons().then(r => setD(r.data.data));
    };

    useEffect(() => {
        load();
    }, []);

    const submit = async e => {
        e.preventDefault();

        await admin.createCoupon({
            ...f,
            value: Number(f.value),
            minOrder: Number(f.minOrder)
        });

        load();
    };

    const deleteCoupon = async id => {
        await admin.deleteCoupon(id);
        load();
    };

    return (
        <section>
            <h1>Coupons</h1>

            <form className="inline-form" onSubmit={submit}>
                <input
                    placeholder="CODE"
                    value={f.code}
                    onChange={e =>
                        setF({ ...f, code: e.target.value })
                    }
                />

                <select
                    value={f.type}
                    onChange={e =>
                        setF({ ...f, type: e.target.value })
                    }
                >
                    <option>percentage</option>
                    <option>fixed</option>
                </select>

                <input
                    type="number"
                    value={f.value}
                    onChange={e =>
                        setF({ ...f, value: e.target.value })
                    }
                />

                <input
                    type="number"
                    value={f.minOrder}
                    onChange={e =>
                        setF({ ...f, minOrder: e.target.value })
                    }
                />

                <button className="btn">
                    Create
                </button>
            </form>

            <div className="list">
                {d.map(c => (
                    <div className="card" key={c._id}>
                        <strong>{c.code}</strong>

                        <p>
                            {c.type} · {c.value}
                        </p>

                        <button
                            className="btn danger"
                            onClick={() => deleteCoupon(c._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}