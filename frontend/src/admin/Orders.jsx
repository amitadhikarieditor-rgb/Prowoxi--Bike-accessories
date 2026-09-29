import React, { useEffect, useState } from 'react';
import { admin } from '../api/resources';

export default function Orders() {
    const [d, setD] = useState([]);

    const load = () => {
        admin.orders().then(r => {
            setD(r.data.data);
        });
    };

    useEffect(() => {
        load();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await admin.updateOrderStatus(id, { status });
            load();
        } catch (e) {
            alert(
                e.response?.data?.message ||
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
        } catch (e) {
            alert(
                e.response?.data?.message ||
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
                            <th>Address</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {d.map(o => (
                            <tr key={o._id}>
                                <td>
                                    {o.orderNumber}
                                </td>

                                <td>
                                    {o.user?.email || 'User'}
                                </td>

                                <td>
                                    {o.addressSnapshot ? (
                                        <>
                                            {o.addressSnapshot.fullName}
                                            <br />

                                            {o.addressSnapshot.addressLine1}
                                            <br />

                                            {o.addressSnapshot.addressLine2 && (
                                                <>
                                                    {o.addressSnapshot.addressLine2}
                                                    <br />
                                                </>
                                            )}

                                            {o.addressSnapshot.city},{' '}
                                            {o.addressSnapshot.state}
                                            <br />

                                            {o.addressSnapshot.pincode}
                                            <br />

                                            {o.addressSnapshot.phone}
                                        </>
                                    ) : (
                                        'No address'
                                    )}
                                </td>

                                <td>
                                    ₹{o.total}
                                </td>

                                <td>
                                    {o.orderStatus}
                                </td>

                                <td>
                                    {nextStatus[o.orderStatus]?.length > 0 && (
                                        <select
                                            value=""
                                            onChange={e =>
                                                updateStatus(
                                                    o._id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Update
                                            </option>

                                            {nextStatus[o.orderStatus].map(
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
                                    {(o.orderStatus === 'DELIVERED' ||
                                        o.orderStatus === 'CANCELLED') && (
                                        <button
                                            className="btn danger"
                                            onClick={() =>
                                                deleteOrder(o._id)
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