import React, { useEffect, useState } from 'react';
import { admin } from '../api/resources';

export default function Orders() {
    const [data, setdata] = useState([]);

    const load = () => {
        admin.orders().then(r => {
            setdata(r.data.data);
        });
    };

    useEffect(() => {
        load();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await admin.updateOrderStatus(id, { status });
            load();
        } catch (Error) {
            alert(
                Error.response?.data?.message ||
                'Failed to update order status'
            );
        }
    };

    const deleteOrder = async id => {
        if (!window.confirm('Delete this order?')) {
            return;
        }

        try {
            await admin.deleteOrder(id);
            load();
        } catch (Error) {
            alert(
                Error.response?.data?.message ||
                'Failed to delete order'
            );
        }
    };

    const nextStatus = {
        PENDING_PAYMENT: ['PAID', 'CANCELLED'],
        PAID: ['PROCESSING', 'CANCELLED'],
        PROCESSING: ['PACKED'],
        PACKED: ['SHIPPED'],
        SHIPPED: ['OUT_FOR_DELIVERY'],
        OUT_FOR_DELIVERY: ['DELIVERED'],
        DELIVERED: [],
        CANCELLED: []
    };

    return (
        <section>
            <h1>Orders</h1>

            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>User</th>
                            <th>Products</th>
                            <th>Address</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map(Order => (
                            <tr key={Order._id}>
                                <td>
                                    {Order.orderNumber}
                                </td>

                                <td>
                                    {Order.user?.email || 'User'}
                                </td>

                                <td>
                                    {Order.items?.length > 0 ? (
                                        <div className="order-products">
                                            {Order.items.map((item, index) => (
                                                <div
                                                    key={item._id || index}
                                                    className="order-product"
                                                >
                                                    <strong>
                                                        {item.product?.name ||
                                                            item.name ||
                                                            'Product'}
                                                    </strong>

                                                    <span>
                                                        Qty: {item.quantity}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        'No products'
                                    )}
                                </td>

                                <td>
                                    {Order.addressSnapshot ? (
                                        <>
                                            {Order.addressSnapshot.fullName}
                                            <br />

                                            {Order.addressSnapshot.addressLine1}
                                            <br />

                                            {Order.addressSnapshot.addressLine2 && (
                                                <>
                                                    {Order.addressSnapshot.addressLine2}
                                                    <br />
                                                </>
                                            )}

                                            {Order.addressSnapshot.city},{' '}
                                            {Order.addressSnapshot.state}
                                            <br />

                                            {Order.addressSnapshot.pincode}
                                            <br />

                                            {Order.addressSnapshot.phone}
                                        </>
                                    ) : (
                                        'No address'
                                    )}
                                </td>

                                <td>
                                    ₹{Order.total}
                                </td>

                                <td>
                                    {Order.orderStatus}
                                </td>

                                <td>
                                    {nextStatus[Order.orderStatus]?.length > 0 && (
                                        <select
                                            value=""
                                            onChange={Error =>
                                                updateStatus(
                                                    Order._id,
                                                    Error.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Update
                                            </option>

                                            {nextStatus[Order.orderStatus].map(
                                                status => (
                                                    <option
                                                        key={status}
                                                        value={status}
                                                    >
                                                        {status}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    )}
                                </td>

                                <td>
                                    {(Order.orderStatus === 'DELIVERED' ||
                                        Order.orderStatus === 'CANCELLED') && (
                                        <button
                                            className="btn danger"
                                            onClick={() =>
                                                deleteOrder(Order._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}