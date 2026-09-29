import React, { useEffect, useState } from 'react';
import { addresses } from '../api/resources';

export default function Addresses() {
    const [d, setD] = useState([]);
    const [f, setF] = useState({
        fullName: '',
        line1: '',
        city: '',
        state: '',
        postalCode: '',
        phone: '',
        isDefault: false
    });

    const load = () => {
        addresses.list().then(r => setD(r.data.data));
    };

    useEffect(() => {
        load();
    }, []);

    const add = async e => {
        e.preventDefault();

        await addresses.create(f);

        setF({
            ...f,
            fullName: '',
            line1: '',
            city: '',
            state: '',
            postalCode: '',
            phone: ''
        });

        load();
    };

    return (
        <section>
            <h1>Addresses</h1>

            <div className="checkout">
                <form className="card form" onSubmit={add}>
                    {Object.keys(f)
                        .filter(k => k !== 'isDefault')
                        .map(k => (
                            <input
                                key={k}
                                required
                                placeholder={k}
                                value={f[k]}
                                onChange={e =>
                                    setF({
                                        ...f,
                                        [k]: e.target.value
                                    })
                                }
                            />
                        ))}

                    <label>
                        <input
                            type="checkbox"
                            checked={f.isDefault}
                            onChange={e =>
                                setF({
                                    ...f,
                                    isDefault: e.target.checked
                                })
                            }
                        />
                        Default
                    </label>

                    <button className="btn">
                        Save address
                    </button>
                </form>

                <div className="list">
                    {d.map(a => (
                        <div className="card" key={a._id}>
                            <strong>{a.fullName}</strong>

                            <p>
                                {a.line1}, {a.city}, {a.state}{' '}
                                {a.postalCode}
                            </p>

                            <button
                                className="link-btn"
                                onClick={() =>
                                    addresses
                                        .remove(a._id)
                                        .then(load)
                                }
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}