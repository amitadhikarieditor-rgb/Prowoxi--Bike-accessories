import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { orders } from "../api/resources";

export default function Orders() {
    const [data, setData] = useState([]);

    useEffect(() => {
        orders
            .list()
            .then((res) => setData(res.data.data))
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
                {data.map((Order) => (
                    <Link
                        className="order-row"
                        key={Order._id}
                        to={`/orders/${Order._id}`}
                    >
                        <div>
                            <strong>{Order.orderNumber}</strong>

                            <p>
                                {Order.items?.length || 0} items ·{" "}
                                {Order.orderStatus}
                            </p>
                        </div>

                        <strong>
                            ₹{Order.total?.toLocaleString("en-IN")}
                        </strong>
                    </Link>
                ))}
            </div>
        </section>
    );
}