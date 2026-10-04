import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { orders } from "../api/resources";

export default function Orders() {
    const [data, setData] = useState([]);

    useEffect(() => {
        orders
            .list()
            .then((r) => setData(r.data.data))
            .catch((err) => {
                console.error("Failed to load orders:", err);
            });
    }, []);

     useEffect(() => {
        document.title = 'Orders- PROWOXI';
    }, []);

    return (
        <section>
            <h1>Orders</h1>

            <div className="list">
                {data.map((o) => (
                    <Link
                        className="order-row"
                        key={o._id}
                        to={`/orders/${o._id}`}
                    >
                        <div>
                            <strong>{o.orderNumber}</strong>

                            <p>
                                {o.items?.length || 0} items ·{" "}
                                {o.orderStatus}
                            </p>
                        </div>

                        <strong>
                            ₹{o.total?.toLocaleString("en-IN")}
                        </strong>
                    </Link>
                ))}
            </div>
        </section>
    );
}