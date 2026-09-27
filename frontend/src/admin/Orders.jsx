import {useEffect,useState} from 'react';
import {orders} from '../api/resources';
export default function Orders(){
    const [d,setD]=useState([]);
    useEffect(()=>{orders.list().then(r=>setD(r.data.data))},[]);
    return <section><h1>Orders</h1>
    <div className="table-wrap">
        <table><thead>
            <tr>
                <th>Order</th>
                <th>User</th>
                <th>Total</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>{d.map(o=><tr key={o._id}>
            <td>{o.orderNumber}</td>
            <td>{o.user?.email||'User'}</td>
            <td>₹{o.total}</td>
            <td>{o.orderStatus}</td>
            </tr>)}</tbody>
            </table>
            </div>
            </section>}
import React from "react";