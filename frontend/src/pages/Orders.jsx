import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { orders } from "../api/resources";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';


export default function Orders() {
    const [data, setData] = useState([]);
    const nav = useNavigate();

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

           <button className="back-btn" onClick={() => nav(-1)}>
    <ArrowLeft size={18} strokeWidth={2} />
    Back
</button>

            <h1>Orders</h1>

            {!data.length && <p>You have no orders yet.</p>}

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