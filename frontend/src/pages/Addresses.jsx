import React, { useEffect, useState } from 'react';
import { addresses } from '../api/resources';

export default function Addresses() {

    useEffect(() => {
        document.title = 'PROVOXI - Addresses';
    }, []);

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

                    <input
                        className="address-input"
                        required
                        placeholder="Full Name"
                        value={f.fullName}
                        onChange={e =>
                            setF({
                                ...f,
                                fullName: e.target.value
                            })
                        }
                    />

                    <input
                        className="address-input"
                        required
                        placeholder="Address"
                        value={f.line1}
                        onChange={e =>
                            setF({
                                ...f,
                                line1: e.target.value
                            })
                        }
                    />

                    <input
                        className="address-input"
                        required
                        placeholder="City"
                        value={f.city}
                        onChange={e =>
                            setF({
                                ...f,
                                city: e.target.value
                            })
                        }
                    />
                    <input
                        className="address-input"
                        required
                        placeholder="State"
                        value={f.state}
                        onChange={e =>
                            setF({
                                ...f,
                                state: e.target.value
                            })
                        }
                    />

                    <input
                        className="address-input"
                        required
                        placeholder="Postal Code"
                        value={f.postalCode}
                        onChange={e =>
                            setF({
                                ...f,
                                postalCode: e.target.value
                            })
                        }
                    />

                    <input
                        className="address-input"
                        required
                        placeholder="Phone Number"
                        value={f.phone}
                        onChange={e =>
                            setF({
                                ...f,
                                phone: e.target.value
                            })
                        }
                    />

                    <label className="address-default">
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