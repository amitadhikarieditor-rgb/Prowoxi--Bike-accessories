import {Link} from 'react-router-dom';
import {Heart} from 'lucide-react';
export default function ProductCard({product,onWishlist}){
    return <article className="card product-card">
        <Link to={`/products/${product._id}`}>
        <img src={product.images?.[0]} 
        alt={product.name}/>
        </Link>
        <div className="card-body">
            <div className="row-between">
                <h3>{product.name}</h3>{onWishlist&&<button className="icon-btn" onClick={()=>onWishlist(product._id)}><Heart size={18}/></button>}</div><p className="muted">{product.category?.name||'Product'}</p><strong>₹{product.price.toLocaleString('en-IN')}</strong><span className="rating">★ {product.ratingAverage?.toFixed(1)||'0.0'}</span></div></article>}
import React from "react"