import {useNavigate} from 'react-router-dom';
import {useCart} from '../contexts/CartContext';
export default function Cart(){
    const {cart,remove}=useCart(),
    nav=useNavigate();if(!cart)
        return <section>
            <h1>Your cart</h1>
            <p>Log in to see your cart.</p>
            </section>;const total=cart.items?.reduce((s,i)=>s+i.product.price*i.quantity,0)||0;
            return 
            <section><div className="section-head">
                <h1>Your cart</h1>
                <strong>₹{total.toLocaleString('en-IN')}</strong>
                </div>{!cart.items?.length?<p>Your cart is empty.</p>:
                <>
                
                <div className="list">{cart.items.map(i=><div className="cart-row" key={i.product._id}><img src={i.product.images?.[0]} alt=""/><div><h3>{i.product.name}</h3><p>Qty {i.quantity}</p></div><strong>₹{(i.product.price*i.quantity).toLocaleString('en-IN')}</strong><button className="link-btn" onClick={()=>remove(i.product._id)}>Remove</button></div>)}</div><button className="btn" onClick={()=>nav('/checkout')}>Checkout</button></>}</section>}
import React from "react";