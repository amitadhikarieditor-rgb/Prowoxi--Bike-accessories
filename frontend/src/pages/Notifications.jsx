import React, { useEffect, useState } from 'react';
import { notifications } from '../api/resources';

export default function Notifications() {
    const [Data, setData] = useState([]);

    const load = () =>
        notifications.list().then(res => setData(res.data.data));

    useEffect(() => {
        console.log('NOTIFICATIONS PAGE LOADED');
        load();
    }, []);

    useEffect(() => {
        document.title = 'Notification- PROWOXI';
    }, []);

    return (
        <section style={{ marginTop: '200px' }}>
            <h1>Notifications</h1>

            <div className="list">
                {Data.map(num => (
                    <article
                        className={`notification ${num.isRead ? 'read' : ''}`}
                        key={num._id}
                    >
                        <strong>{num.title}</strong>

                        <p>{num.message}</p>

                        <small>
                            {new Date(num.createdAt).toLocaleString('en-IN', {
                                dateStyle: 'medium',
                                timeStyle: 'short'
                            })}
                        </small>

                        {!num.isRead && (
                            <button
                                className="link-btn"
                                onClick={() =>
                                    notifications.read(num._id).then(load)
                                }
                            >
                                Mark read
                            </button>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}