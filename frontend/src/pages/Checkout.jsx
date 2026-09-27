import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {addresses,orders} from '../api/resources';
import {useCart} from '../contexts/CartContext';
export default function Checkout(){
    const {cart}=useCart(),
    nav=useNavigate(),
    [as,setAs]=useState([]),
    [selected,setSelected]=useState('');
    useEffect(()=>{addresses.list().then(r=>{setAs(r.data.data);
        setSelected(r.data.data.find(x=>x.isDefault)?._id||r.data.data[0]?._id||'')})},[]);
        const submit=async()=>{if(!selected)return alert('Add/select an address first');
            try{
                const r=await orders.create({addressId:selected});
                const p=r.data.data.payment;
                if(window.Razorpay&&p?.orderId){
                    const rz=new window.Razorpay
                    ({key:p.keyId,amount:p.amount,currency:p.currency,order_id:p.orderId,handler:async resp=>{
                        await orders.verify({orderId:r.data.data.order._id,paymentId:resp.razorpay_payment_id});
                        nav('/orders')},theme:{color:'#111827'}});
                        rz.open()
                    }else nav('/orders')}
                    catch(e){
                        alert(e.response?.data?.message||'Checkout failed')}};
                        return <section>
                            <h1>Checkout</h1>
                            <div className="checkout">
                                <div className="card form">
                                    <h3>Delivery address</h3>{as.map(a=><label className="address" key={a._id}>
                                        <input type="radio" checked={selected===a._id} onChange={()=>setSelected(a._id)}/>
                                        <span><strong>{a.fullName}</strong><br/>{a.line1}, {a.city}, {a.state} {a.postalCode}<br/>
                                        {a.phone}</span></label>)}{!as.length&&<p>No address yet. Add one from your account/profile area.</p>}
                                        <button className="btn" onClick={submit}>Place order & pay</button></div><div className="card">
                                            <h3>Order summary</h3><p>{cart?.items?.length||0} items</p><strong>₹{(cart?.items?.reduce((s,i)=>s+i.product.price*i.quantity,0)||0).toLocaleString('en-IN')}</strong>
                                            </div></div></section>}
import React from "react";