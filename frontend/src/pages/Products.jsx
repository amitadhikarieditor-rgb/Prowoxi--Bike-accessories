import {useEffect,useState} from 'react';
import React from "react";
import {products} from '../api/resources';
import ProductCard from '../components/ProductCard';
export default function Products(){const [data,setData]=useState({data:[],pagination:{}}),
[q,setQ]=useState(''),
[sort,setSort]=useState('newest'),
[loading,setLoading]=useState(true);
const load=()=>{setLoading(true);
    products.list({q:q||undefined,sort,page:1,limit:12})
    .then(r=>setData(r.data))
    .finally(()=>setLoading(false))};
    useEffect(()=>{load()},[sort]);
    return <section><div className="section-head">
        <div><span className="eyebrow">CATALOG</span><h1>Shop Provoxi</h1></div>
        <div className="filters">
            <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==='Enter'&&load()} placeholder="Search products…"/>
            <select value={sort} onChange={e=>setSort(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="price_asc">Price: low to high</option>
                <option value="price_desc">Price: high to low</option>
                <option value="rating">Rating</option></select>
                </div></div>{loading?<p>Loading products…</p>:<div className="grid">{data.data.map(p=><ProductCard key={p._id} product={p}/>)}</div>}</section>}
