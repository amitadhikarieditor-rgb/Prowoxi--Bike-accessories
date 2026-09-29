import React, { useEffect, useState } from 'react';
import { notifications } from '../api/resources';

export default function Notifications() {
    const [d, setD] = useState([]);

    const load = () =>
        notifications.list().then(r => setD(r.data.data));

    useEffect(() => {
        console.log('NOTIFICATIONS PAGE LOADED');
        load();
    }, []);

    return (
        <section style={{ marginTop: '200px' }}>
            <h1>Notifications</h1>

            <div className="list">
                {d.map(n => (
                    <article
                        className={`notification ${n.isRead ? 'read' : ''}`}
                        key={n._id}
                    >
                        <strong>{n.title}</strong>

                        <p>{n.message}</p>

                        <small>
                            {new Date(n.createdAt).toLocaleString('en-IN', {
                                dateStyle: 'medium',
                                timeStyle: 'short'
                            })}
                        </small>

                        {!n.isRead && (
                            <button
                                className="link-btn"
                                onClick={() =>
                                    notifications.read(n._id).then(load)
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