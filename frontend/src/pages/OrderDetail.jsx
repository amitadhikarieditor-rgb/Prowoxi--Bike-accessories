import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orders } from "../api/resources";

export default function OrderDetail() {
    const { id } = useParams();
    const [Order, SetOrder] = useState(null);

     useEffect(() => {
        document.title = 'OdersDetail- PROWOXI';
    }, []);


    useEffect(() => {
        orders
            .get(id)
            .then((res) => SetOrder(res.data.data))
            .catch((err) => {
                console.error("Failed to load order:", err);
            });
    }, [id]);
    
    if (!Order) {
        return <p>Loading…</p>;
    }

    return (
        <section>
            <span className="eyebrow">
                ORDER {Order.orderNumber}
            </span>

            <h1>{Order.orderStatus}</h1>

            <p>
                Payment: {Order.paymentStatus}
            </p>

            <div className="timeline">
                {Order.history?.map((h, i) => (
                    <div key={i}>
                        <strong>{h.status}</strong>

                        <span>
                            {new Date(h.at).toLocaleString()}
                        </span>

                        <p>{h.note}</p>
                    </div>
                ))}
            </div>

            <div className="list">
                {Order.items?.map((item, n) => (
                    <div
                        className="cart-row"
                        key={n}
                    >
                        <div>
                            <strong>{item.name}</strong>

                            <p>
                                Qty {item.quantity}
                            </p>
                        </div>

                        <strong>
                            ₹{item.lineTotal?.toLocaleString("en-IN")}
                        </strong>
                    </div>
                ))}
            </div>

            <h2>
                Total ₹{Order.total?.toLocaleString("en-IN")}
            </h2>
        </section>
    );
}